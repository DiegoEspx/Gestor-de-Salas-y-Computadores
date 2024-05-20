from api_Salas.models import sala, computadora
from rest_framework import serializers

class SalaSerializer(serializers.ModelSerializer):
    cantidad_computadoras = serializers.SerializerMethodField()

    class Meta:
        model = sala
        fields = ['id', 'nombre', 'cantidad_computadoras']

    def get_cantidad_computadoras(self, obj):
        return obj.computadora_set.count()

class ComputadoraSerializer(serializers.ModelSerializer):
    nombre_sala = serializers.CharField(source='sala.nombre', read_only=True)

    class Meta:
        model = computadora
        fields = ['id', 'sala', 'nombre_sala', 'numero', 'ocupado']