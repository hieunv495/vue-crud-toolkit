// const getErrorMessage = (e) => {
//   if (e.response && e.response.data && e.response.data.message) {
//     return e.response.data.message;
//   } else {
//     return 'Lỗi không xác định';
//   }
// };

const getErrorMessage = (e) => e.message;

export default getErrorMessage;
