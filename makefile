makeall: mblogs mblogView github

mblogs:
	htmlCreator/main.exe blogs blogs 
mblogView:
	htmlCreator/main.exe blogView blogView 








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

	git add .\css\blogView.css
	git add .\css\blogs.css
	git add .\css\topbar.css
	git add .\css\const-parameter.css

	git add .\js\navbar.js

	git add .\makefile


	git commit -m "tamam"
	git push -u origin master