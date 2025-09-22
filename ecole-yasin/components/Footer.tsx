const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-6 text-sm text-slate-600">
      <div className="container flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {currentYear} École Ya-Sin. Tous droits réservés.</p>
        <p className="text-xs sm:text-sm">Suivi personnalisé de la mémorisation du Coran.</p>
      </div>
    </footer>
  );
};

export default Footer;
