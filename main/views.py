# Create your views here.
from django.template import RequestContext
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from main.models import post
from django.shortcuts import render_to_response, redirect
from django.contrib.sites.models import Site
from django.utils import timezone 
from django.utils.text import slugify
def index(request):
    return render_to_response('index.html', {}, context_instance=RequestContext(request))

def start(request):
    current_site = Site.objects.get_current()
    
    return render_to_response('freshStart.html', {}, context_instance=RequestContext(request))

def fresh(request):
    if request.method == 'POST':
        u = User.objects.create_user(request.POST['uName'], request.POST['email'], request.POST['uPass'])
        p = post(postedBy = u, postedDate = timezone.now(), title=request.POST['title'], content=request.POST['content'], url=slugify(request.POST['title']))
        p.save()
        au = authenticate(username=request.POST['uName'], password=request.POST['uPass'])
        login(request, au)

        return redirect('/u/'+u.username)
    else:
        return redirect('/start')

def posts(request, user):
    u = User.objects.get(username=user)
    p = post.objects.filter(postedBy=u).order_by('-postedDate')
    return render_to_response('account.html', {'posts':p, 'u':u}, context_instance=RequestContext(request))

def singlePost(request, user, t):
    u = User.objects.get(username=user)
    #try:
    p = post.objects.get(postedBy=u, url=t)
    #except:
        #return redirect('/u/'+user)
    return render_to_response('post.html', {'post':p, 'u':u}, context_instance=RequestContext(request))

def editPost(request, user, t):
    u = User.objects.get(username=user)
    p = post.objects.get(postedBy=u, url=t)
    if u == request.user:
        if request.method == 'GET':
            return render_to_response('edit.html', {'post':p, 'u':u}, context_instance=RequestContext(request))
        else:
            p.title = request.POST['title']
            p.url = slugify(request.POST['title'])
            p.content = request.POST['content']
            p.save()
            return redirect('/u/'+user+'/'+p.url)
    else:
        return redirect('/u/'+user+'/'+p.url)

def createPost(request):
    u = request.user
    p = post(title = request.POST['title'], url = slugify(request.POST['title']), content = request.POST['content'], postedDate = timezone.now(), postedBy = u)
    p.save()
    return redirect('/u/'+u.username+'/'+p.url)

def leave(request):
    logout(request)
    return redirect('/')
