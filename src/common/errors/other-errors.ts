export const OTHER_ERRORS = {
  FIELD_MAX_LENGTH: (length: number) =>
    `Максимально допустимая длина ${length} символов`,
  MUST_BE_EMAIL: 'Должен быть указан валидный адрес электронной почты',
  NO_WHITE_SPACES: 'Не должно быть пробелов',
  OTHER_FIELD_SHOULD_NOT_BE_EMPTY: 'Поле не должно быть пустым',
  UPDATE_DATA_BODY_EMPTY: 'Тело данных для обновления пусто',
  AUTH_PASSWORD_MUST_MATCH: `Пароль должен содержать:
    - 8 и более символов
    - прописные латинские буквы
    - строчные латинские буквы
    - цифры`,
};
