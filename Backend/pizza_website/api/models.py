from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Pizza(models.Model):
    #image = models.ImageField(upload_to='pizzas/')
    pizza_name = models.CharField(max_length=50)
    instructions = models.TextField()

    def __str__(self):
        return self.pizza_name

class Comments(models.Model):
    #userID = models.CharField(max_length=10, default="user#", unique=True)
    username = models.CharField(max_length=50) #models.ForeignKey(User, related_name='name', on_delete=models.CASCADE) #User.Username
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    pizza = models.ForeignKey(Pizza, related_name='comments', on_delete=models.CASCADE)

    def __str__(self):
        return f'Comment by {self.username} on {self.pizza.pizza_name}'
