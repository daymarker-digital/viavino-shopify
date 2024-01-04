//////////////////////////////////////////////////////////
////  Vars
//////////////////////////////////////////////////////////

const config = { debug: false, name: 'forms.js', version: '1.0' };
const forms = document.querySelectorAll( 'form.js--validate-me' ) || [];
const reCaptcha = {
  enable: false,
  v3: {
    keys: {
      site: '6LfuWuIgAAAAAKSZZvc9s-sr2MdS9zWjpxGq_5B8',
      secret: '6LfuWuIgAAAAAP1Eo5-h_rqVYDMtT3_8Ptmz0MbU'
    }
  }
};
const regEx = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
};

//////////////////////////////////////////////////////////
////  Private Methods
//////////////////////////////////////////////////////////

const getFormData = ( form = false ) => {
  let elements = form.elements || [];
  let data = {};
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].nodeName !== "BUTTON") {
      data[elements[i].name] = elements[i].value;
    }
  }
  return data;
};

// ---------------------------------------- Is Field Valid?
const isFieldValid = ( field = false ) => {

  if ( config.debug ) console.log( '[ isFieldValid() initialized ]', field );

  let valid = false;
  let nodeType = field.nodeName || '';

  switch ( nodeType ) {
    case 'INPUT': {
      valid = isInputValid(field) ;
      break;
    }
    case 'SELECT': {
      break;
    }
    case 'TEXTAREA': {
      valid = isTextareaValid(field) ;
      break;
    }
  }

  if ( config.debug ) console.log( '[ isFieldValid() complete ]', valid );

  return valid;

};

// ---------------------------------------- Is Form Valid?
const isFormValid = ( form = false ) => {

  let requiredFields = form.querySelectorAll('.required') || [];
  let requiredFieldsCount = requiredFields.length;
  let validFieldsCount = 0;

  requiredFields.forEach( field => {
    if ( config.debug ) console.log( '[ isFormValid() ]', field );
    if ( isFieldValid( field ) ) {
      validFieldsCount++;
    }
  });

  if ( requiredFieldsCount == validFieldsCount ) {
    return true;
  }

  return false;

};

// ---------------------------------------- Is Input Valid?
const isInputValid = ( input = {} ) => {

  let type = input.type || '';
  let value = input.value || '';
  let valid = false;

  switch ( type ) {
    case 'email': {
      valid = testEmail(value);
      break;
    }
    case 'tel': {
      valid = testTel(value);
      break;
    }
    case 'text': {
      valid = testText(value);
      break;
    }
  }

  updateFieldState( input, valid );

  if ( config.debug ) console.log( '[ isInputValid() complete ]', { type, value } );

  return valid;

};

// ---------------------------------------- Is Textarea Valid?
const isTextareaValid = ( textarea = {} ) => {

  let value = textarea.value || '';
  let valid = testText(value);

  updateFieldState( textarea, valid );

  if ( config.debug ) console.log( '[ isTextareaValid() complete ]', { value, valid } );

  return valid;

};

// ---------------------------------------- On Field Focus
const onFormFocus = ( form = false ) => {

  if ( form ) {

    form.addEventListener( 'focusin', (e) => {
      let field = e.target.closest('.field') || false;
      if ( field ) field.classList.add('in-focus');
    });

    form.addEventListener( 'focusout', (e) => {
      let field = e.target.closest('.field') || false;
      if ( field && !e.target.value ) {
        isFieldValid( field );
        field.classList.remove('in-focus');
      }
    });

  }

};

// ---------------------------------------- Submit Form
const submitForm = ( formAction = '', formData = false, formRedirect = '' ) => {
  if ( formAction && formData ) {

    document.body.classList.add('form-posting');

    // fetch( formAction, {
    //   method: "POST",
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: formData
    // })
    // .then((response) => response.json())
    // .then((data) => console.log('[ submitForm() Success ]', data))
    // .catch((error) => {
    //   console.error('[ submitForm() Error ]', error);
    // });

    axios.post( formAction, formData )
    .then( data => {
      if ( 200 === data.status ) {
        console.log('[ submitForm() Success ]', data );
        if ( formRedirect ) {
          window.location.replace( formRedirect );
        } else {
          document.body.classList.remove('form-posting');
          // let successMessage = document.querySelector(`[action="${formAction}"] .form__success-notification`) || false;
          // if ( successMessage ) {
          //   let animation = anime.timeline({
          //     targets: successMessage,
          //     easing: 'easeOutExpo',
          //     begin: function() {
          //       successMessage.style.display = 'block';
          //     },
          //     complete: function() {}
          //   })
          //   .add({
          //     opacity: 1,
          //     delay: 250,
          //     duration: 650
          //   }).play;
          // }
        }
      }
    })
    .catch( data => {
      console.log('[ submitForm() Error ]', data );
    }).finally( data => {
      console.log('[ submitForm() Finally ]', data );
    });

  }
};

// ---------------------------------------- Test Email Against RegEx
const testEmail = ( value = '' ) => {
  return value && regEx.email.test(value) ? true : false;
};

// ---------------------------------------- Test Telephone Against RegEx
const testTel = ( value = '' ) => {
  return value && regEx.phone.test(value) ? true : false;
};

// ---------------------------------------- Test Text Against RegEx
const testText = ( value = '' ) => {
  return value.trim() ? true : false;
};

// ---------------------------------------- Update Field State
const updateFieldState = ( input = {}, valid = false ) => {

  let field = input.closest('.field') || false;

  if ( field ) {
    if ( valid ) {
      field.classList.remove('error');
    } else {
      field.classList.add('error');
    }
  }

  if ( config.debug ) console.log( '[ updateFieldState() ]', { field, valid } );

};

//////////////////////////////////////////////////////////
////  Public Methods
//////////////////////////////////////////////////////////

// ---------------------------------------- Initialize
const init = () => {

  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} initialized ]`);

    forms.forEach( form => {
      onFormFocus( form );
    });

    ( document.querySelectorAll('form.js--validate-me [type="submit"]') || [] ).forEach( button => {
      button.addEventListener('click', event => {

        event.preventDefault();

        let form = button.closest( 'form' );
        let formAction = form.action || '';
        let formData = new FormData( form );
        //let formData = getFormData( form );
        let formDataObject = Object.fromEntries(formData.entries());
	      let formDataJSONString = JSON.stringify(formDataObject);


        let formIsValid = isFormValid( form );
        let formRedirect = form.dataset.redirect || '';

        if ( config.debug ) console.log({
          form,
          formAction,
          formData,
          formDataObject,
          formDataJSONString,
          formIsValid,
          formRedirect,
        });

        if ( formIsValid ) {
          if ( reCaptcha.enable ) {
            reCaptchaVersion3( 'submit', formAction, formData, formRedirect );
          } else {
            submitForm( formAction, formData, formRedirect );
          }
        }

      });
    });

  if ( config.debug ) console.log(`[ ${config.name} v.${config.version} complete ]`);

};

export default {
  init
};
