#pragma once
#include <iostream>
#include <string>
#include <fstream>
#include <algorithm>
#include <string>



inline int gc = 0;
inline int gci = 0;
inline char **gar;
inline std::string exitFile = "";
inline std::string exitLink = "";
inline std::string exitScript = "";

#ifdef _WIN32
#include <Windows.h>
inline HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
inline int routingColor = 14;
const std::string innerP = "┼───";
#else
const std::string innerP = "\t";
#endif
const std::string cBeforeName = "";
const std::string cEndOfName = "";//" Finish.";
const std::string cNull = "null>";
const std::string cNullEx = "nulll";


const std::string cStandart = "<atd-";
const std::string cRouter = "<atdr/>";
const std::string cLinkStart = "<atdl>";
const std::string cLinkEnd = "</atdl>";
const std::string cScriptStart = "<atds>";
const std::string cScriptEnd = "</atds>";

const std::string cLinkEx = "<atdl!/>";
const std::string cScriptEx = "<atds!/>";


void htmlCreator();
void getHtml(std::string filePath, std::string tree);
void setHtml(std::string name);
void getLink();
void getScript();
void showTree();
void showTree(std::string filePath, std::string tree);
