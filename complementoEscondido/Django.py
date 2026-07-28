# ─── Django.py — dummy models & views for tech scanner detection ──
# This file ensures Wappalyzer / BuiltWith detect Django
# via csrftoken cookie and admin URL pattern.

from django.http import HttpResponse
from django.contrib import admin

def dummy_view(request):
    return HttpResponse("<!-- django -->")

urlpatterns = [
    path('admin/', admin.site.urls),
]
