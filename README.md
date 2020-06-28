# visao-comp-trab1

## dependencias

### nodejs
    Este projeto utiliza o nodejs para download de dependencias e também sua execução. Você pode baixar o nodejs a partir do site oficial.
    https://nodejs.org/pt-br/download/

    Como para a execução deste software será utilizado bibliotecas nativas, durante a instalação do nodejs marque a opção de instalar o python juntamente com o compilador do visual studio. Caso contrário, não será posivel importar o opencv4nodejs

### opencv
    Para realizar as operações sobre as imagens e videos deste software, será utilizada a bibliocata opencv. Utilizaremos os binários nativos do sistema operacional, que pode ser encontrado no site oficial:
    https://opencv.org/releases/

    Para este projeto foi utilizada a versão 4.3.0. Outras versões provavelmente funcionam também, mas não foram testadas.

### opencv4nodejs (npm)    
    Esta biblioteca irá realizar a ponte entre os binários nativos e o nodejs. Porém, para isso ocorrer, os binários devem ser recompilados para se adequar ao node-gyp (por isso é necessário o compilador do visual studio para windows).
    Para o correto 'build' e posterior funcionamento desta dependencia, configure as seguintes variaveis de ambiente:

        OPENCV4NODEJS_DISABLE_AUTOBUILD=1
        OPENCV_INCLUDE_DIR=<diretório do opencv>\build\include
        OPENCV_BIN_DIR=<diretório do opencv>\build\x64\vc15\bin
        OPENCV_LIB_DIR=<>\build\x64\vc15\lib

    E adicione ao path:
        PATH=..., %OPENCV_BIN_DIR%


## build
    Para baixar as bibliotecas necessárias para executar o projeto, rode no terminal:
        npm install

## documentação e exemplos
    https://docs.opencv.org/master/dc/de6/tutorial_js_nodejs.html
    https://docs.opencv.org/master/d2/df0/tutorial_js_table_of_contents_imgproc.html
    https://docs.opencv.org/master/d7/dd0/tutorial_js_thresholding.html
    https://docs.opencv.org/master/d7/de1/tutorial_js_canny.html
    https://docs.opencv.org/master/d3/de6/tutorial_js_houghlines.html

### baseado em
    https://www.youtube.com/watch?v=pDA4mncyJ8Q