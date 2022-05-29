from django.shortcuts import render

# Create your views here.
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializers
from . import models
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['signedUpAt'] = self.user.signedUpAt
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = serializers.CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                pass
            except:
                return JsonResponse({'message': "Username is already used!"}, status=status.HTTP_200_OK)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': serializer.errors}, status=status.HTTP_200_OK)

    def get(self, request):
        users = models.CustomUser.objects.all()
        users_serializer = serializers.ViewUserSerializer(
            users, many=True)
        return JsonResponse(users_serializer.data, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def MuscleGroup(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        object_serializer = serializers.MuscleGroupSerializer(data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'Muscle group with the same name already exists!'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        all_data = models.MuscleGroup.objects.all().order_by('-id')
        object_serializer = serializers.MuscleGroupSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def MyMuscleGroup(request, pk):
    if request.method == 'GET':
        # All data of specific user
        all_data = models.MuscleGroup.objects.all().filter(user=pk).order_by('-id')
        object_serializer = serializers.MuscleGroupSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)
    elif request.method == 'PUT':
        # Modifying specific entry
        entry = models.MuscleGroup.objects.get(pk=pk)
        data = JSONParser().parse(request)
        object_serializer = serializers.MuscleGroupSerializer(
            entry, data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data)
        return JsonResponse(object_serializer.errors, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        entry = models.MuscleGroup.objects.get(pk=pk)
        entry.delete()
        return JsonResponse({'message': 'Deleted!'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
def Exercise(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        object_serializer = serializers.ExerciseSerializer(data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'Exercise with the same name already exists!'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        all_data = models.Exercise.objects.all().order_by('-id')
        object_serializer = serializers.ViewExerciseSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def MyExercise(request, pk):
    if request.method == 'GET':
        # All data of specific user
        all_data = models.Exercise.objects.all().filter(user=pk).order_by('-id')
        object_serializer = serializers.ViewExerciseSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)
    elif request.method == 'PUT':
        # Modifying specific entry
        entry = models.Exercise.objects.get(pk=pk)
        data = JSONParser().parse(request)
        object_serializer = serializers.ExerciseSerializer(
            entry, data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data)
        return JsonResponse(object_serializer.errors, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        entry = models.Exercise.objects.get(pk=pk)
        entry.delete()
        return JsonResponse({'message': 'Deleted!'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
def Workout(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        object_serializer = serializers.WorkoutSerializer(data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'Workout with the same name already exists!'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        all_data = models.Workout.objects.all().order_by('-id')
        object_serializer = serializers.ViewWorkoutSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def MyWorkout(request, pk):
    if request.method == 'GET':
        # All data of specific user
        all_data = models.Workout.objects.all().filter(user=pk).order_by('-id')
        object_serializer = serializers.ViewWorkoutSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)
    elif request.method == 'PUT':
        # Modifying specific entry
        entry = models.Workout.objects.get(pk=pk)
        data = JSONParser().parse(request)
        object_serializer = serializers.WorkoutSerializer(
            entry, data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data)
        return JsonResponse(object_serializer.errors, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        entry = models.Workout.objects.get(pk=pk)
        entry.delete()
        return JsonResponse({'message': 'Deleted!'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
def Schedule(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        object_serializer = serializers.ScheduleSerializer(data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'Day is already reserved!'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        all_data = models.Schedule.objects.all().order_by('-id')
        object_serializer = serializers.ViewScheduleSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def MySchedule(request, pk):
    if request.method == 'GET':
        # All data of specific user
        all_data = models.Schedule.objects.all().filter(user=pk).order_by('-id')
        object_serializer = serializers.ViewScheduleSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)
    elif request.method == 'PUT':
        # Modifying specific entry
        entry = models.Schedule.objects.get(pk=pk)
        data = JSONParser().parse(request)
        object_serializer = serializers.ScheduleSerializer(
            entry, data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data)
        return JsonResponse({'message': 'Day is already reserved!'}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        entry = models.Schedule.objects.get(pk=pk)
        entry.delete()
        return JsonResponse({'message': 'Deleted!'}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def Stopwatch(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        object_serializer = serializers.StopwatchSerializer(data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'Something bad happened!'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        all_data = models.Stopwatch.objects.all().order_by('-id')
        object_serializer = serializers.StopwatchSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


@api_view(['GET'])
def MyStopwatch(request, pk):
    if request.method == 'GET':
        # All data of specific user
        all_data = models.Stopwatch.objects.all().filter(user=pk).order_by('-id')
        object_serializer = serializers.StopwatchSerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


@api_view(['GET', 'POST'])
def BMI(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        the_height = float(data["height"])
        the_weight = float(data["weight"])
        the_BMI = the_weight/((the_height/100)**2)
        data["bmi"] = the_BMI
        if the_BMI <= 18.5:
            data["status"] = "Underweight"
        elif the_BMI <= 24.9:
            data["status"] = "Healthy"
        elif the_BMI <= 29.9:
            data["status"] = "Overweight"
        else:
            data["status"] = "Obesity"
        object_serializer = serializers.BMISerializer(data=data)
        if object_serializer.is_valid():
            object_serializer.save()
            return JsonResponse(object_serializer.data, status=status.HTTP_200_OK)
        return JsonResponse({'message': 'Something bad happened!'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        all_data = models.BMI.objects.all().order_by('-id')
        object_serializer = serializers.BMISerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)


@api_view(['GET'])
def MyBMI(request, pk):
    if request.method == 'GET':
        # All data of specific user
        all_data = models.BMI.objects.all().filter(user=pk).order_by('-id')
        object_serializer = serializers.BMISerializer(
            all_data, many=True)
        return JsonResponse(object_serializer.data, safe=False)

# @api_view(['GET', 'POST', 'DELETE'])
# def MuscleGroup(request):
    # if request.method == 'GET':
    #     Signup = models.Signup.objects.all()

    #     plan = request.query_params.get('plan', None)
    #     if plan is not None:
    #         Signup = Signup.filter(plan=plan)

    #     signup_serializer = serializers.SignupSerializer(Signup, many=True)
    #     return JsonResponse(signup_serializer.data, safe=False)
    #     # 'safe=False' for objects serialization

    # elif request.method == 'POST':
    #     user_data = JSONParser().parse(request)
    #     user_data["password"] = make_password(user_data["password"])
    #     if user_data["plan"] == "basic":
    #         user_data["credits"] = 50
    #     elif user_data["plan"] == "advanced":
    #         user_data["credits"] = 75
    #     elif user_data["plan"] == "professional":
    #         user_data["credits"] = 100
    #     signup_serializer = serializers.SignupSerializer(data=user_data)
    #     if signup_serializer.is_valid():
    #         signup_serializer.save()
    #         return JsonResponse(signup_serializer.data, status=status.HTTP_200_OK)
    #     return JsonResponse({'message': 'exists'}, status=status.HTTP_200_OK)

    # elif request.method == 'DELETE':
    #     count = models.Signup.objects.all().delete()
    #     return JsonResponse({'message': 'alldeleted'}, status=status.HTTP_200_OK)
    # pass

# @api_view(['GET', 'PUT', 'DELETE'])
# def user_detail(request, pk):
#     try:
#         user = models.Signup.objects.get(pk=pk)
#     except models.Signup.DoesNotExist:
#         return JsonResponse({'message': 'notexist'}, status=status.HTTP_200_OK)

#     if request.method == 'GET':
#         signup_serializer = serializers.SignupSerializer(user)
#         return JsonResponse(signup_serializer.data)

#     elif request.method == 'PUT':
#         user_data = JSONParser().parse(request)
#         signup_serializer = serializers.SignupSerializer(
#             user, data=user_data)
#         if signup_serializer.is_valid():
#             signup_serializer.save()
#             return JsonResponse(signup_serializer.data)
#         return JsonResponse(signup_serializer.errors, status=status.HTTP_200_OK)

#     elif request.method == 'DELETE':
#         user.delete()
#         return JsonResponse({'message': 'deleted'}, status=status.HTTP_200_OK)
