#include "./header/htmlCreator.h"
#include <iostream>
#include <string>
#include <fstream>
#include <algorithm>
#include <string>
#include <vector>


void getHtml(std::string filePath, std::string tree){

    std::string line;
    std::ifstream myfile("htmlCreator/input/" + filePath + ".html");

    if (myfile.is_open())
    {
        while ( getline (myfile,line) )
        {
            if (line.find(cStandart) != std::string::npos) {
                std::string name = "";
                for (size_t i = (line.find(cStandart)+cStandart.size()); i < line.size(); ++i)
                {
                    if (line[i] == '/' && line[i+1] == '>')
                    {
                        break;
                    }
                    name += line[i];
                }

                std::cout << tree << cBeforeName << name << ": " << '\n';
                
                std::string upperName = "";
                for (auto & c: name) upperName += toupper(c);
                exitFile += "<!-- START " + upperName + " -->\n";
                getHtml(name, tree + innerP);
                exitFile += "<!-- STOP  " + upperName + " -->\n";
            }
            else if(line.find(cRouter) != std::string::npos){
                std::string name = "";
                if (gc >= gci)
                {
                    name = gar[gci];
                    ++gci;
                }
                else{
                    std::cerr << "paramatre eksik - " << name << "-" << filePath << " - " << gci << std::endl;
                }
                
                std::cout << tree << cBeforeName;
                #ifdef _WIN32
                SetConsoleTextAttribute(hConsole, routingColor);
                
                if(name.find(cNullEx) != std::string::npos && name != cNullEx){
                    SetConsoleTextAttribute(hConsole, 31);
                    std::cout << "N";
                    SetConsoleTextAttribute(hConsole, routingColor);
                    SetConsoleTextAttribute(hConsole, routingColor);
                    std::cout << name.substr(cNullEx.length(), name.length()) << ": " << '\n';
                }
                else{
                    std::cout << name << ": " << '\n';
                }
                
                --routingColor;
                #else
                    std::cout << "N-" << name.substr(cNullEx.length(), name.length()) << ": " << '\n';
                #endif



                #ifdef _WIN32
                SetConsoleTextAttribute(hConsole, 15);
                #endif
                
                if(name == cNull){
                    exitFile += "<!-- NULL  R-->\n";
                }
                else if(name == cNullEx){
                    exitFile += line.substr(0,line.find(cRouter));
                    exitFile += line.substr(line.find(cRouter)+cRouter.length(),line.length());
                }
                else if(name.find(cNullEx) != std::string::npos){
                    exitFile += line.substr(0,line.find(cRouter));
                    getHtml(name.substr(cNullEx.length(), name.length()), tree + innerP);
                    exitFile += line.substr(line.find(cRouter)+cRouter.length(),line.length());
                }
                else{
                    std::string upperName = "";
                    for (auto & c: name) upperName += toupper(c);
                    exitFile += "<!-- START " + upperName + " R-->\n";
                    getHtml(name, tree + innerP);
                    exitFile += "<!-- STOP  " + upperName + " R-->\n";
                }
                
            }
            else if(line.find(cLinkStart) != std::string::npos){
                std::string name = "";
                bool flag = true;
                
                while (flag){
                    getline(myfile,name);
                    if(name.find(cLinkEnd) != std::string::npos){
                        flag = false;
                        break;
                    }
                    else{
                        exitLink += name + "\n";
                    }
                }
                
            }
            else if(line.find(cScriptStart) != std::string::npos){
                std::string name = "";
                bool flag = true;
                
                while (flag){
                    getline(myfile,name);
                    if(name.find(cScriptEnd) != std::string::npos){
                        flag = false;
                        break;
                    }
                    else{
                        exitScript += name + "\n";
                    }
                }
                
            }
            else{
                exitFile += line + "\n";
            }
        }
        
        myfile.close();
        if(cEndOfName != "")
            std::cout << tree.substr(0, (tree.size()-innerP.size())) << cEndOfName << std::endl; 

    }
    else std::cout << tree << "Unable to open file"; 

}

//ekseik
void showTree(std::vector<std::vector<std::string>> datas){
    #ifdef _WIN32
        SetConsoleOutputCP(CP_UTF8);
    #endif

    int gciTemp = gci;

    gci = 2;
    std::cout << std::endl << "Start: HtmlCreator - " << gar[1] <<  " - " << gc << std::endl;
    showTree("main", innerP);
    std::cout << "End: " << gar[1] << std::endl << std::endl;
    
    gci = gciTemp;
}

void showTree(std::string filePath, std::string tree){
    
    std::string line;
    std::ifstream myfile("htmlCreator/input/" + filePath + ".html");

    if (myfile.is_open())
    {
        while ( getline (myfile,line) )
        {
            if (line.find(cStandart) != std::string::npos) {
                std::string name = "";
                for (size_t i = (line.find(cStandart)+cStandart.size()); i < line.size(); ++i)
                {
                    if (line[i] == '/' && line[i+1] == '>')
                    {
                        break;
                    }
                    name += line[i];
                }

                std::cout << tree << cBeforeName << name << ": " << '\n';
                
                std::string upperName = "";
                for (auto & c: name) upperName += toupper(c);
                showTree(name, tree + innerP);
            }
            else if(line.find(cRouter) != std::string::npos){
                std::string name = "";
                if (gc >= gci)
                {
                    name = gar[gci];
                    ++gci;
                }
                else{
                    std::cerr << "paramatre eksik - " << name << "-" << filePath << " - " << gci << std::endl;
                }
                

                std::cout << tree << cBeforeName;
                #ifdef _WIN32
                SetConsoleTextAttribute(hConsole, routingColor);
                --routingColor;
                #endif
                std::cout << name << ": " << '\n';
                #ifdef _WIN32
                SetConsoleTextAttribute(hConsole, 15);
                #endif
                
                if(name == "null"){
                }
                else{
                    std::string upperName = "";
                    for (auto & c: name) upperName += toupper(c);
                    showTree(name, tree + innerP);
                }
                
            }
            else if(line.find(cLinkStart) != std::string::npos){
                
            }
            else if(line.find(cScriptStart) != std::string::npos){
                
            }
            else{
            }
        }
        
        myfile.close();
        if(cEndOfName != "")
            std::cout << tree.substr(0, (tree.size()-innerP.size())) << cEndOfName << std::endl; 

    }
    else std::cout << tree << "Unable to open file"; 
}

void setHtml(std::string name){
    //ofstream myfile("output/" + name + ".html");
    std::ofstream myfile("" + name + ".html");

    if (myfile.is_open() ){
        myfile << exitFile;
        myfile.close();
    }
    else std::cout << "Dosya olusturulamadı!" << std::endl;
}

void getLink(){//<atdl!/>
    if (exitFile.find(cLinkEx) != std::string::npos) {
        int i = exitFile.find(cLinkEx);
        std::string temp = exitFile;
        exitFile = temp.substr(0,i);
        exitFile += "<!-- START LINK -->\n";
        exitFile += exitLink;
        exitFile += "<!-- STOP  LINK -->\n";
        exitFile += temp.substr ((i+cLinkEx.size()), temp.size());
    }
    else{
        std::cout << "Ekstra link yok" << std::endl;
    }
}

void getScript(){//<atds!/>
    if (exitFile.find(cScriptEx) != std::string::npos) {
        int i = exitFile.find(cScriptEx);
        std::string temp = exitFile;
        exitFile = temp.substr(0,i);
        exitFile += "<!-- START SCRIPT -->\n";
        exitFile += exitScript;
        exitFile += "<!-- STOP  SCRIPT -->\n";
        exitFile += temp.substr ((i+cScriptEx.size()), temp.size());
    }
    else{
        std::cout << "Ekstra Script yok" << std::endl;
    }
}

void htmlCreator(){
    #ifdef _WIN32
        SetConsoleOutputCP(CP_UTF8);
    #endif
    
    std::cout << std::endl << "Start: HtmlCreator - " << gar[1] <<  " - " << gc << std::endl;

    getHtml("main", innerP);
    std::cout << "End: " << gar[1] << std::endl;
    getLink();
    getScript();
    
    setHtml(gar[1]);

    std::cout << std::endl;
}
