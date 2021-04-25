from django.shortcuts import render


def show_analysis(request):
    return render(request, 'show_anaylsis.html')
