import { Schema } from 'dynamoose';

export const TodoSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
});
