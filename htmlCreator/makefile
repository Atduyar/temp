makeall: mblogs mblogView m

mblogs:
	main.exe blogs blogs
mblogView:
	main.exe blogView blogView



m:
	batmake.bat





cr: delete compile run

delete:
	del main.exe
compile:
	mingw32-g++.exe -o main.exe main.cpp
c: compile
run: mblogs
