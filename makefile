makeall: mblogs mblogView login signup user github 

mblogs:
	htmlCreator/main.exe blogs blogs 
mblogView:
	htmlCreator/main.exe blogView blogView 
login:
	htmlCreator/main.exe login login nulll
signup:
	htmlCreator/main.exe signup login nulllsignup
user:
	htmlCreator/main.exe user user








cr: delete compile run

delete:
	del htmlCreator\main.exe
compile:
	g++.exe -c htmlCreator/src/htmlCreator.cpp -o htmlCreator/src/obj/htmlCreator.o -std=c++17
	g++.exe -c htmlCreator/src/main.cpp -o htmlCreator/src/obj/main.o -std=c++17
	g++.exe htmlCreator/src/obj/main.o htmlCreator/src/obj/htmlCreator.o -o htmlCreator/main.exe -std=c++17
run: 
	.\htmlCreator\main.exe 

d: delete
c: compile
r: run


github:
	git add --all

	git commit -m "tamam"
	git push -u origin master