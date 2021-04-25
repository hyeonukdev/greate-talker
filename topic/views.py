from django.shortcuts import render


def show_topic(request):
    return render(request, 'show_topic.html')
