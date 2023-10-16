const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});


// // Crie um modelo (Model) associado ao seu esquema
// const Usertest = mongoose.model('User', userSchema);

// // Exemplo de uso para criar um novo usuário
// const newUser = new Usertest({
//   username: 'exemplo',
//   password: 'senha123',
//   tokens: [{ token: 'token123' }],
// });

// newUser.save()
//   .then((result) => {
//     console.log('Novo usuário criado:', result);
//   })
//   .catch((error) => {
//     console.error('Erro ao criar usuário:', error);
//   });




userSchema.methods.verifyPassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

module.exports = User;