from django.urls import path
from api_Salas.views import Salas_api_view, Computadoras_api_view, DetalleSala

urlpatterns=[
# Salas
    # Crear sala
    path('crear-sala/', Salas_api_view.as_view(), name='crear_sala'),
    # Actualizar sala
    path('actualizar-sala/<int:pk>/', Salas_api_view.as_view(), name='actualizar_sala'),
    # Eliminar sala
    path('eliminar-sala/<int:pk>/', Salas_api_view.as_view(), name='eliminar_sala'),
    
# Computadoras
    # Crear computadora
    path('crear-computador/', Computadoras_api_view.as_view(), name='crear_computador'),
    # Detalle de la sala
    path('detalle-sala/<int:sala_id>/', DetalleSala.as_view(), name='detalle_sala'),
    # Actualizar estado de las computadoras
    path('estado-computadoras/<int:pk>/', Computadoras_api_view.as_view(), name='computadoras_detail'),
    # Eliminar Computadora por ID
    path('eliminar-computadora/<int:pk>/', Computadoras_api_view.as_view(), name='eliminar_computadora'),

]   