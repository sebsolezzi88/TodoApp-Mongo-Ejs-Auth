//Función que reenderiza el dashboard y protegida con express-session
export const renderDashboard = (req, res) => {
  return res.render('dashboard');
};