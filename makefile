makeall: mblogs mblogView login github

mblogs:
	htmlCreator/main.exe blogs blogs 
mblogView:
	htmlCreator/main.exe blogView blogView 
login:
	htmlCreator/main.exe login login








cr: delete compile run

delete:
	del htmlCreator\main.exe
compile:
	mingw32-g++.exe -o htmlCreator/main.exe htmlCreator/main.cpp
d: delete
c: compile
run: mblogs


github:
	git add .\index.html
	git add .\blogView.html
	git add .\blogs.html
	git add .\login.html

	git add .\css\const-parameter.css
	git add .\css\topbar.css
	git add .\css\blogView.css
	git add .\css\blogs.css
	git add .\css\login.css

	git add .\js\navbar.js
	git add .\js\login.js

	git add .\makefile


	git commit -m "tamam"
	git push -u origin master