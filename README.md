# Nicolas AMBROISE Website

# Introduction
Hey! I follow the Google Scholarship Nanodegree on Udacity. I would like to put in practice what I learn, and to receive your suggestion as we are learning together the “Mobile Web”
Here are some element that I will implement
- Use of Gulp
- Use of Bootstrap 4 with Sass generation
- Service Worker for Offline cache
- Website Optimisation
- Push Notification

To do that I chose a simple website, I made 4 years ago for my CV. I will implement Service Worker and do some website optimization on it. For the moment this website is very slow ( more than 5s to load the main page), that why it’s the perfect website for my test.

# Prerequise
node JS + npm

# How to install
> npm install
> npm init
> gulp

# Next steps
In a first phases, I will put in cache the skeleton of my html, after that I will put in cache the image and static content (to view it offline)
In a second phases, I will make an Ajax request to get some XML or JSON content (like an RSS feed) to put in my website an save the first 30 records to the IDB to make them available immediately ( online/offline/and with poor network).
Third step, continue the courses and implement each new feature to my simple website.

Next week I will try to get this message and put them in the IDB and the attached picture in a dynamic cache, should be tricky ! ( I think that I will watch again videos about IDB ^^) As I receive it as JSON or XML it will be the same.

# History
Here are the steps : What I implement and the issues I met during my development

11/11/2017 After an update of all information on my CV, I edit the JS file to test
if (‘serviceWorker’ in navigator) {console.log(“ServiceWorker available in Browser”);	}
navigator.serviceWorker.register(’…/sw.js’).then(function(reg) { …
But it failed as I don’t use HTTPS on my domain.

12/11/2017 Creating a SSL certificate Request. Waiting it, I clean my CSS / JS and HTML code and update to “Bootstrap 3.2.0”. Next step will be to use Bootstrap 4.0.0-beta.2 to make my website “Mobile-First”. Now I’m on good bases to start the development.

13/11/2017 Still waiting for the SSL certificate, I see that more than 70% of the loading time are for picture loading.
I optimize picture on my website, and made my big background load after the content with a JS script.
I also add a Lazy-Loading script to load picture in modals only when the modal open for the first time.

14/11/2017 My host OVH active the SSL Certificate on my website :smile: . Now I can access to it with https://
But still have some issues with mixin-content and redirection.I’m not very familiar with DNS Area, CNAME, I have to get some information on it.

15/11/2017 I manage to configure my domain and I edit the .htaccess file to add a redirect 301 to add the “https” and the “www” to all my request. So now it works !

16/11/2017 : First try to register Service Worker and it’s work pretty well !

18/11/2017 : Few issues with my Service Worker : 
- I can’t view my website Offline
- I can’t see picture when I try some false URL
- I have few cache register has the same time

19/11/2017 : I do again the chapiter about Service Worker

20/11/2017 : I manage to solve my issue putting my sw.js in the root folder, and the target on the root. I don’t know why ? Have you got some explanation ?
I also manage to put html files, picture, js and css in the cache

21/11/2017 : Improving my sw.js file I met new question : How to deal with a website of multiple page ? Could I use the following JS request to ask for update ?
if (confirm('New version available, press OK to reload the website')) {
       worker.postMessage({action: 'skipWaiting'});
} else {
alert(‘Why did you press cancel? You should have confirmed’);
}

22/11/2017 : Tomorrow Challenge - create a XML or JSON content (like RSS feed)
Thanks for your help !

Thanks a lot @Focus3D and @chnebx, this afternoon I try the webpack and gulp and it really amazing !! Why I never try it before ^^
I follow a really nice tuto on alsacreation (In french : https://www.alsacreations.com/tuto/lire/1686-introduction-a-gulp.html) about gulp and I write my own package.json and gulpfile.js with 3 methods :

Concatenate SASS stylesheets and then minify/uglify them
Concatenate JS files and then minify/uglify them
Resize picture
Now I have to re-make my website structure to be compatible with Gulp !

I already use Lightouse audit , Front-End Checklist (https://frontendchecklist.io/) , Woorank and SEO Site analyses to get some feedback on my development.

With the Lighthouse one I get the following marks :
- Progressive Web App : 100% ( Thanks to service worker :smile: )
- Performance : 82%
- Accessibility : 100%
- Best Practice : 92%
For the performance, I think that Gulp could help me a lot (concatenate JS and CSS files + minify them)
I really thinks about using the Bootstrap v4 (https://getbootstrap.com/) and just developping in simple javascript the function to open the modals. Instead of loading all the Bootstrap JS Libraries and the JQuery one. But it will be tricky for me to use Ajax request without JQuery.

For best practice, I don’t understand how to improve it, the only fail is that requests on my website were not handled over HTTP/2 but I thinks it’s more on server side.

23/11/2017 I start an other quick website to made a RSS feed like.

24/11/2017 I spent 2 days making my gulpfile.js and doing some test about it!
Does it make sense to hash files names call by my index.html now that Service Worker are implemented ?
In my previous development, I manually add an hash code to my file name to bypass the cache
example : style.min.css ==> style-0000000000.min.css
I discover some nice gulp plugins like “gulp-hash-filename” or “hash_src”.
but with service worker, if the css is updated, I receive a notification automatically to update
reg.addEventListener(‘updatefound’, function() {
console.log(‘Update found !’);
trackInstalling(reg.installing)
});
So now I don’t need hash anymore ?

25/11/2017 As asked on Slack, how to do put task in order in my gulpfile.js file ? I try serie and serialize but don’t thinks it work …
Please help me to compile it !

28/11/2017 Test with gulp.series (Gulp 4)
gulp.task(“script”, gulp.series(“JSConcat”, “JSminify”)) ;
There’s also gulp.parallel when you look for maximum conccurency between the tasks, I found a link with interesting info :
https://fettblog.eu/gulp-4-parallel-and-series/ Thanks @chnebx

30/11/2017 Test with run-sequence (Gulp 3.9) Thanks to @Focus3D and test with Image resizing but not succefully.

1 and 2/12/2017 Relook the tuto about Service Worker on the Udacity website  

3/12/2017 I remove the hashing and I manage to do actions by step
I update all my project with the Gulp logic on this branch :
I still have 2 questions :
- In my “JSminifySW” why I can’t uglyfy the sw.js and IndexController.js ?
- In my “IMGresize” how can I avoid the alert “You try to resize an image bigger than the original” ?
Ok what’s the next step to do before end of the year ?

4 to 8/12/2017 I Finish the Mobile web courses on Udacity Nanodegree

9/12/2017 Test with Bootstrap 4 and compile Sass with Koala. I Also take a look to Google Material, Semantic UI, Pure Css and Foundation.
But my preference go to the new version of Bootstrap as it's mobile First and the Css is very easy to use and well documented.
What I still have in mind is to remove all the jQuery part and to developp all of it in pure vanilla JS...
Even if it's a minify version, the jquery.min.js is a heavy file render bloquing...

10/12/2017 Try to use Boostrap 4 with Gulp
