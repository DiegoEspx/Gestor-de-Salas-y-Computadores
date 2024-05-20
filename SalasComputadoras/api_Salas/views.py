from django.shortcuts import render
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from api_Salas.models import sala, computadora
from api_Salas.serializer import SalaSerializer, ComputadoraSerializer
from rest_framework import status, permissions
from .models import computadora
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import sala, computadora


class Salas_api_view(APIView):
    # crear sala
    def post(self, request, *args, **kwargs):
        data = {
            'nombre' : request.data.get('nombre')
        }
        serializador = SalaSerializer(data = data)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data, status = status.HTTP_200_OK)
        return Response(serializador.data, status = status.HTTP_400_BAD_REQUEST)
    
    # Lista de salas
    def get(self,request, *args, **kwargs):
        lista_salas = sala.objects.all()
        # Modificar los datos de cada sala para incluir la cantidad de computadoras
        for sala_obj in lista_salas:
            sala_obj.actualizar_cantidad_computadoras()
        # Serializar las salas actualizadas
        serializer_salas = SalaSerializer(lista_salas, many=True)
        return Response(serializer_salas.data,status=status.HTTP_200_OK)
    
    
    # Actualizar Sala
    def put(self, request, *args, **kwargs):
        sala_id = kwargs.get('pk')
        try:
            sala_obj = sala.objects.get(pk=sala_id)
            data = {
                'nombre': request.data.get('nombre', sala_obj.nombre),
            }
            serializador = SalaSerializer(sala_obj, data=data, partial=True)
            if serializador.is_valid():
                serializador.save()
                return Response(serializador.data, status=status.HTTP_200_OK)
            return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)
        except sala.DoesNotExist:
            return Response({"error": "La sala especificada no existe."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Eliminar Sala
    def delete(self, request, *args, **kwargs):
        sala_id = kwargs.get('pk')
        try:
            sala_obj = sala.objects.get(pk=sala_id)
            sala_obj.delete()
            return Response({"mensaje": "La sala ha sido eliminada correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except sala.DoesNotExist:
            return Response({"error": "La sala especificada no existe."}, status=status.HTTP_404_NOT_FOUND)
        
        
        
        
class Computadoras_api_view(APIView):
    
    def post(self, request, *args, **kwargs):
        data = {
            'sala': request.data.get('sala'),  # ID de la sala
            'numero': request.data.get('numero'),
            'ocupado': request.data.get('ocupado'),
        }
        serializer = ComputadoraSerializer(data=data)
        if serializer.is_valid():
            # Obtén la sala correspondiente
            sala_id = data['sala']
            sala_obj = sala.objects.get(id=sala_id)
            serializer.validated_data['sala'] = sala_obj
            serializer.save()
            # Actualiza la cantidad de computadoras en la sala
            sala_obj.actualizar_cantidad_computadoras()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        try:
            lista_computadoras = computadora.objects.all()
            serializer = ComputadoraSerializer(lista_computadoras, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request, *args, **kwargs):
        try:
            # Obtener el ID de la computadora a actualizar desde la URL
            computadora_id = kwargs.get('pk')
            # Obtener la computadora correspondiente
            computadora_obj = computadora.objects.get(pk=computadora_id)

            # Cambiar el estado de ocupado de la computadora
            nuevo_estado = not computadora_obj.ocupado
            computadora_obj.ocupado = nuevo_estado
            computadora_obj.save()

            return Response({"mensaje": "El estado de la computadora ha sido actualizado correctamente."},
                            status=status.HTTP_200_OK)
        except computadora.DoesNotExist:
            return Response({"error": "La computadora especificada no existe."},
                            status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, pk, *args, **kwargs):
        try:
            computadora_obj = computadora.objects.get(pk=pk)
            sala_obj = computadora_obj.sala
            computadora_obj.delete()
            # Actualiza el detalle de la sala después de eliminar la computadora
            sala_obj.actualizar_cantidad_computadoras()
            return Response({"mensaje": "La computadora ha sido eliminada correctamente."}, status=status.HTTP_204_NO_CONTENT)
        except computadora.DoesNotExist:
            return Response({"error": "La computadora especificada no existe."}, status=status.HTTP_404_NOT_FOUND)
    
class DetalleSala(APIView):
    def get(self, request, sala_id):
        try:
            sala_obj = sala.objects.get(id=sala_id)
            cantidad_computadoras = sala_obj.cantidad_computadoras
            computadoras_en_sala = computadora.objects.filter(sala=sala_id)
            # Contar cuántas computadoras están ocupadas y cuántas no
            ocupadas = computadoras_en_sala.filter(ocupado=True).count()
            libres = cantidad_computadoras - ocupadas
            # Obtener detalles de las computadoras (números y estado de ocupación)
            detalles_computadoras = [
                {"numero": comp.numero, "ocupado": comp.ocupado} 
                for comp in computadoras_en_sala
            ]
            response_data = {
                "nombre": sala_obj.nombre,
                "id":sala_obj.id,
                "cantidad_computadoras": cantidad_computadoras,
                "computadoras": detalles_computadoras,
                "ocupadas": ocupadas,
                "libres": libres
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
        except sala.DoesNotExist:
            return Response({"error": "La sala especificada no existe."}, status=status.HTTP_404_NOT_FOUND)
        