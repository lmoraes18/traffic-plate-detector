# visao-comp-trab1

## dependencias
    Este projeto utiliza o nodejs para download de dependencias e também sua execução. Você pode baixar o nodejs a partir do site oficial.
    https://nodejs.org/pt-br/download/

## build
    Para baixar as bibliotecas necessárias para executar o projeto, rode no terminal:
        
        npm install

### opencv.js
    A biblioteca opencv.js não está disponivel no npm, mas está disponivel a partir do site oficial:
    https://opencv.org/

    O Opencv é escrito em código c++. E, como não existe um codigo fonte especifico para javascript do open, 
    é utilizado uma ferramenta chamada Emscripten para converter código compilado c++ para javascript.
    
    Para este build do opencv.js, foi utilizado o build do docker, por não precisar instalar ferramentas extras.
    Detalhes neste link:
    https://github.com/opencv/opencv/blob/4.3.0/doc/js_tutorials/js_setup/js_setup/js_setup.markdown


## documentação e exemplos
    https://docs.opencv.org/master/dc/de6/tutorial_js_nodejs.html
    https://docs.opencv.org/master/d2/df0/tutorial_js_table_of_contents_imgproc.html
    https://docs.opencv.org/master/d7/dd0/tutorial_js_thresholding.html
    https://docs.opencv.org/master/d7/de1/tutorial_js_canny.html
    https://docs.opencv.org/master/d3/de6/tutorial_js_houghlines.html

### baseado em
    https://www.youtube.com/watch?v=pDA4mncyJ8Q