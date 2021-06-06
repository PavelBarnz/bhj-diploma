/**
 * Основная функция для совершения запросов
 * на сервер.
 * */  
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.open(options.method, options.url);
    xhr.responseType = options.responseType;
    

    if(options.method !== "GET"){
        const formData = new FormData();
        for(let key in options.data){
            formData.append(key, options.data[key]);
        }
        xhr.send(formData);
    } else {
        xhr.send(options.data);
    }

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            if(xhr.response.success === true){
                options.callback(null, xhr.response);
            } else {
                options.callback(xhr.response.error);
            }
        }
    }
};
