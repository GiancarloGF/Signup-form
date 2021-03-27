const form=document.getElementById('form');//Capturamos el formulario completo.
const inputs=document.querySelectorAll('#form input');//Capturamos cada uno de los inputs.


// Objeto Regex
const expresiones = {
	// usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	// telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}



const camposValidos={
      ['first-name']: false,
      ['last-name']: false,
      ['password']: false,
      ['email']: false

}

// Agregamos un evento en el input para poder validar lo que se esta escribiendo.
const inputValidation= (e)=>{


      switch(e.target.name){//Validamos cada tipo de input con el atributo name.
            case 'first-name': 
                  validarCampo(expresiones.nombre,e.target, 'first-name');
            break;

            case 'last-name': 
                  validarCampo(expresiones.nombre,e.target,  'last-name');
            break;

            case 'email': 
                  validarCampo(expresiones.correo,e.target, 'email');
            break;

            case 'password': 
                  validarCampo(expresiones.password,e.target, 'password');
            break;
      }
}


const validarCampo= (expresion, input,campo)=>{
                        if (expresion.test(input.value)) {//Asi accedemos al valor del input | regex.test(valueToTest) >>true or false
                        document.getElementById(`group__${campo}`).classList.remove('input--error');
                        document.getElementById(`group__${campo}`).classList.add('input--success');

                        document.querySelector(`#group__${campo} i`).classList.remove('fa-times-circle');//Remuevo la clase que le da estilo al icono (oculto)
                        document.querySelector(`#group__${campo} i`).classList.add('fa-check-circle');//Añado otra clase que da estilo a otro icono
                        // document.querySelector('#group__first-name .fa-times-circle').style.display='none';//Este es otra forma de hacer aparecer y ocultat la clase.
                        document.querySelector(`#group__${campo} .paraf__error`).classList.remove('paraf__error--active');

                        camposValidos[campo]=true;//Para poder validar que todos los campos estan correctos antes de enviar el formulario.
                  }else{
                        document.getElementById(`group__${campo}`).classList.remove('input--success');
                        document.getElementById(`group__${campo}`).classList.add('input--error');

                        document.querySelector(`#group__${campo} i`).classList.remove('fa-check-circle');//Remuevo la clase que le da estilo al icono check
                        document.querySelector(`#group__${campo} i`).classList.add('fa-times-circle');// Añado la clase que da estilo al icono X (oculto)
                        document.querySelector(`#group__${campo} i`).classList.add('fa-times-circle--active');//Añadimos otra clase que hace mostrar al X oculto.
                        // document.querySelector('#group__first-name .fa-times-circle').style.display='block';//Este es otra forma de hacer aparecer y ocultat la clase.
                        document.querySelector(`#group__${campo} .paraf__error` ).classList.add('paraf__error--active');
                        camposValidos[campo]=false;
                  }
            
}


inputs.forEach((input)=>{
      input.addEventListener('keyup',inputValidation);//Validamos el campo del input despues de soltar una tecla.
      input.addEventListener('blur',inputValidation);//Validamos el campo del input al hacer click afuera
})


// Agregamos un evento al boton enviar para validar los campos e informacion.
form.addEventListener('submit' ,(e)=>{
      
      e.preventDefault();//Prevenir que el formulario se envie sin ningun dato.(Aprender+)
      
      if(camposValidos['first-name'] && camposValidos['last-name'] && camposValidos['password'] &&camposValidos['email']){//Si todos los campos son validos
            form.reset();
            document.querySelectorAll('.input--success').forEach((input)=>{//Para quitar el borde verde cuando se envie el formulario para simular refresh.
                  input.classList.remove('input--success');
            })
            
            document.querySelectorAll('.fa-check-circle').forEach((icono)=>{//Para quitar el icono check cuando se envie el formulario para simular refresh.
                  icono.classList.remove('fa-check-circle');
            })
            
            
            
      }else{
            document.querySelectorAll('.paraf__error').classList.add('paraf__error--active');
      }
})