from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('pizza-home/', views.PizzaListCreate.as_view(), name="note-list"),
    path('individual-pizzas/', views.PizzaDelete.as_view(), name="delete-note"),
    path('pizza/<int:id>/comments/', views.CommentList.as_view(), name='view-pizza-comments'),
    path('pizza/', views.Pizzas.as_view(), name='view-all-pizza'),
    path('pizza/<int:id>/', views.OnePizzaList.as_view(), name='view-one-pizza'),
    path('create-pizza/', views.PizzaCreate.as_view(), name='create-pizza'),
    path('create-comment/<int:pizza_id>/', views.CommentCreate.as_view(), name='create-comment'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)