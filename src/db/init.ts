import Attendance from "./models/attendance.model";
import Employee from "./models/employee.model";
import Registration from "./models/registration.model";

const isDev = true;
async function init() {
  await Employee.sync({ alter: isDev });
  await Attendance.sync({ alter: isDev });
  await Registration.sync({ alter: isDev });
}
const dbInit = () => {
  init();
};

export default dbInit;
