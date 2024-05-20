from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

class sala(models.Model):
    nombre = models.CharField(max_length=100)
    cantidad_computadoras = models.IntegerField(default=0)
    
    def actualizar_cantidad_computadoras(self):
        self.cantidad_computadoras = self.computadora_set.count()
        self.save()
    
    def __str__(self):
        return f"{self.nombre} - {self.cantidad_computadoras} computadoras"

class computadora(models.Model):
    sala = models.ForeignKey(sala, on_delete=models.CASCADE)
    numero = models.IntegerField()
    ocupado = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.sala.nombre} - {self.numero}"

@receiver(post_save, sender=computadora)
@receiver(post_delete, sender=computadora)
def actualizar_cantidad_computadoras_sala(sender, instance, **kwargs):
    instance.sala.actualizar_cantidad_computadoras()