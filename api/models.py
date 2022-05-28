from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    signedUpAt = models.DateTimeField(auto_now_add=True)


class MuscleGroup(models.Model):
    name = models.CharField(max_length=300, unique=True)
    user = models.ForeignKey(CustomUser, related_name="muscle_group_user", on_delete=models.CASCADE)


class Exercise(models.Model):
    name = models.CharField(max_length=300, unique=True)
    muscleGroup = models.ForeignKey(
        MuscleGroup, related_name="exercise_group", on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, related_name="exercise_user", on_delete=models.CASCADE)

class Workout(models.Model):
    name = models.CharField(max_length=300, unique=True)
    exercises = models.JSONField()
    muscleGroup = models.ForeignKey(
        MuscleGroup, related_name="workout_group", on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, related_name="workout_user", on_delete=models.CASCADE)
