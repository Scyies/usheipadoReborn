import { SetterOrUpdater } from 'recoil';

export function setTodaysDate(setter: SetterOrUpdater<string>) {
  const date = new Date();
  const today = date.getDay();

  switch (today) {
    case 1:
      setter('Segunda');
      break;
    case 2:
      setter('Terca');
      break;
    case 3:
      setter('Quarta');
      break;
    case 4:
      setter('Quinta');
      break;
    case 5:
      setter('Sexta');
      break;
    case 6:
      setter('Sabado');
      break;
    case 0:
      setter('Domingo');
      break;
    default:
      return;
  }
}
