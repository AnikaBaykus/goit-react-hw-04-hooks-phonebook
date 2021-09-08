import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './ContactForm.module.css';

export default function ContactForm(options) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const formNameId = uuidv4();
  const formNumberId = uuidv4();

  const handleChangeName = event => {
    setName(event.currentTarget.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.currentTarget.value);
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    options.onSubmit(name, number);
    resetForm();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label} htmlFor={formNameId}>
        Name{' '}
        <input
          className={s.input}
          id={formNameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleChangeName}
          placeholder={'Add name...'}
        />
      </label>

      <label className={s.label} htmlFor={formNumberId}>
        Number{' '}
        <input
          className={s.input}
          id={formNumberId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleChangeNumber}
          placeholder={'Add phone number...'}
        />
      </label>

      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

// class ContactForm extends Component {
//   static defaultProps = {
//     name: '',
//     number: '',
//   };

//   state = {
//     name: this.props.name,
//     number: this.props.number,
//   };

//   formNameId = uuidv4();
//   formNumberId = uuidv4();

//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit(this.state);
//     this.resetForm();
//   };

//   resetForm = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   render() {
//     return (
//       <form className={s.form} onSubmit={this.handleSubmit}>
//         <label className={s.label} htmlFor={this.formNameId}>
//           Name{' '}
//           <input
//             className={s.input}
//             id={this.formNameId}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
//             required
//             value={this.state.name}
//             onChange={this.handleChange}
//             placeholder={'Add name...'}
//           />
//         </label>

//         <label className={s.label} htmlFor={this.formNumberId}>
//           Number{' '}
//           <input
//             className={s.input}
//             id={this.formNumberId}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
//             required
//             value={this.state.number}
//             onChange={this.handleChange}
//             placeholder={'Add phone number...'}
//           />
//         </label>

//         <button className={s.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
//   }
// }

// export default ContactForm;
