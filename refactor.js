import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, 'src')

const componentsDir = path.join(srcDir, 'components')
const pagesDir = path.join(srcDir, 'pages')

const newDirs = [
  path.join(pagesDir, 'public'),
  path.join(pagesDir, 'dueño_mascota'),
  path.join(pagesDir, 'vetAdmin'),
  path.join(pagesDir, 'adminGeneral'),
  path.join(componentsDir, 'common'),
  path.join(componentsDir, 'dueño_mascota'),
  path.join(componentsDir, 'vetAdmin'),
  path.join(componentsDir, 'adminGeneral')
];

for (const dir of newDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const fileMoves = [
  // Pages
  { old: 'pages/AdmiGeneralUserLg.jsx', new: 'pages/adminGeneral/AdmiGeneralUserLg.jsx' },
  { old: 'pages/AdmiGeneralVetLg.jsx', new: 'pages/adminGeneral/AdmiGeneralVetLg.jsx' },
  { old: 'pages/HistorialMascotaMq.jsx', new: 'pages/dueño_mascota/HistorialMascotaMq.jsx' },
  { old: 'pages/HomePageLg.jsx', new: 'pages/public/HomePageLg.jsx' },
  { old: 'pages/LandingPageMq.jsx', new: 'pages/public/LandingPageMq.jsx' },
  { old: 'pages/Login.jsx', new: 'pages/public/Login.jsx' },
  { old: 'pages/MiCarritoXh.jsx', new: 'pages/dueño_mascota/MiCarritoXh.jsx' },
  { old: 'pages/MiPerfilXh.jsx', new: 'pages/dueño_mascota/MiPerfilXh.jsx' },
  { old: 'pages/MiWishListLg.jsx', new: 'pages/dueño_mascota/MiWishListLg.jsx' },
  { old: 'pages/NavigationAdminMq.jsx', new: 'pages/vetAdmin/NavigationAdminMq.jsx' },
  { old: 'pages/NotFoundMq.jsx', new: 'pages/public/NotFoundMq.jsx' },
  { old: 'pages/ProductsLw.jsx', new: 'pages/public/ProductsLw.jsx' },
  { old: 'pages/RouteAdminGenMq.jsx', new: 'pages/adminGeneral/RouteAdminGenMq.jsx' },
  { old: 'pages/ServicesLw.jsx', new: 'pages/public/ServicesLw.jsx' },
  { old: 'pages/VeterinariasMq.jsx', new: 'pages/public/VeterinariasMq.jsx' },

  // Manuel
  { old: 'components/Manuel/CardsByMq.jsx', new: 'components/common/CardsByMq.jsx' },
  { old: 'components/Manuel/ContenidoAdminGeneralMq.jsx', new: 'components/adminGeneral/ContenidoAdminGeneralMq.jsx' },
  { old: 'components/Manuel/ContentGenMq.jsx', new: 'components/common/ContentGenMq.jsx' },
  { old: 'components/Manuel/ContentMq.jsx', new: 'components/vetAdmin/ContentMq.jsx' },
  { old: 'components/Manuel/InputMq.jsx', new: 'components/common/InputMq.jsx' },
  { old: 'components/Manuel/ModalMq.jsx', new: 'components/common/ModalMq.jsx' },
  { old: 'components/Manuel/ProductsItemsMq.jsx', new: 'components/vetAdmin/ProductsItemsMq.jsx' },
  { old: 'components/Manuel/ProtectedRoute.jsx', new: 'components/common/ProtectedRoute.jsx' },
  { old: 'components/Manuel/RegisterCustomerMq.jsx', new: 'components/common/RegisterCustomerMq.jsx' },
  { old: 'components/Manuel/RegisterMascotasMq.jsx', new: 'components/common/RegisterMascotasMq.jsx' },
  { old: 'components/Manuel/RegisterMq.jsx', new: 'components/common/RegisterMq.jsx' },
  { old: 'components/Manuel/RegisterUserMq.jsx', new: 'components/common/RegisterUserMq.jsx' },
  { old: 'components/Manuel/SelectorMq.jsx', new: 'components/common/SelectorMq.jsx' },
  { old: 'components/Manuel/ServicesItemsMq.jsx', new: 'components/vetAdmin/ServicesItemsMq.jsx' },
  { old: 'components/Manuel/SidebarMq.jsx', new: 'components/vetAdmin/SidebarMq.jsx' },
  { old: 'components/Manuel/SuccessLoginMq.jsx', new: 'components/common/SuccessLoginMq.jsx' },
  { old: 'components/Manuel/UploadImageMq.jsx', new: 'components/common/UploadImageMq.jsx' },
  
  // Laura
  { old: 'components/Laura/HeaderLg.jsx', new: 'components/common/HeaderLg.jsx' },
  { old: 'components/Laura/FooterLg.jsx', new: 'components/common/FooterLg.jsx' },
  { old: 'components/Laura/BannerLg.jsx', new: 'components/common/BannerLg.jsx' },
  { old: 'components/Laura/ButtonLg.jsx', new: 'components/common/ButtonLg.jsx' },
  { old: 'components/Laura/CloseBtnLg.jsx', new: 'components/common/CloseBtnLg.jsx' },
  { old: 'components/Laura/ConfirmationModalLg.jsx', new: 'components/common/ConfirmationModalLg.jsx' },
  { old: 'components/Laura/DetailCardLg.jsx', new: 'components/common/DetailCardLg.jsx' },
  { old: 'components/Laura/FilterLg.jsx', new: 'components/common/FilterLg.jsx' },
  { old: 'components/Laura/GaleryLg.jsx', new: 'components/common/GaleryLg.jsx' },
  { old: 'components/Laura/InputGroupLg.jsx', new: 'components/common/InputGroupLg.jsx' },
  { old: 'components/Laura/PaginacionLg.jsx', new: 'components/common/PaginacionLg.jsx' },
  { old: 'components/Laura/PrombannerLg.jsx', new: 'components/common/PrombannerLg.jsx' },
  { old: 'components/Laura/SearchLg.jsx', new: 'components/common/SearchLg.jsx' },
  { old: 'components/Laura/ContentServicesLg.jsx', new: 'components/vetAdmin/ContentServicesLg.jsx' },
  { old: 'components/Laura/ModalServicesLg.jsx', new: 'components/vetAdmin/ModalServicesLg.jsx' },
  { old: 'components/Laura/ServiceLg.jsx', new: 'components/vetAdmin/ServiceLg.jsx' },
  { old: 'components/Laura/SidebarLg.jsx', new: 'components/vetAdmin/SidebarLg.jsx' },
  { old: 'components/Laura/AddVetLg.jsx', new: 'components/adminGeneral/AddVetLg.jsx' },
  { old: 'components/Laura/NewVetFormLg.jsx', new: 'components/adminGeneral/NewVetFormLg.jsx' },
  { old: 'components/Laura/TableVetsContLg.jsx', new: 'components/adminGeneral/TableVetsContLg.jsx' },
  { old: 'components/Laura/TableVetsLg.jsx', new: 'components/adminGeneral/TableVetsLg.jsx' },
  { old: 'components/Laura/VetsDataLg.jsx', new: 'components/adminGeneral/VetsDataLg.jsx' },
  { old: 'components/Laura/HeaderAdmiGeneralLg.jsx', new: 'components/adminGeneral/HeaderAdmiGeneralLg.jsx' },
  { old: 'components/Laura/ProductosLg.jsx', new: 'components/common/ProductosLg.jsx' },
  { old: 'components/Laura/ProfileCreatedLg.jsx', new: 'components/common/ProfileCreatedLg.jsx' },
  { old: 'components/Laura/WishListLg.jsx', new: 'components/dueño_mascota/WishListLg.jsx' },
  { old: 'components/Laura/IconEditLg.jsx', new: 'components/common/IconEditLg.jsx' },

  // Lina
  { old: 'components/Lina/BannerLw.jsx', new: 'components/common/BannerLw.jsx' },
  { old: 'components/Lina/CardLw.jsx', new: 'components/common/CardLw.jsx' },
  { old: 'components/Lina/FilterLw.jsx', new: 'components/common/FilterLw.jsx' },
  { old: 'components/Lina/PaginationLw.jsx', new: 'components/common/PaginationLw.jsx' },

  // Tomas
  { old: 'components/Tomas/CalculaCarritoTL.jsx', new: 'components/dueño_mascota/CalculaCarritoTL.jsx' },
  { old: 'components/Tomas/CarritoComprasTL.jsx', new: 'components/dueño_mascota/CarritoComprasTL.jsx' },
  { old: 'components/Tomas/FechaEnvioTL.jsx', new: 'components/dueño_mascota/FechaEnvioTL.jsx' },
  { old: 'components/Tomas/FormaEntregaCarritoTL.jsx', new: 'components/dueño_mascota/FormaEntregaCarritoTL.jsx' },
  { old: 'components/Tomas/ListaProductosTL.jsx', new: 'components/dueño_mascota/ListaProductosTL.jsx' },
  { old: 'components/Tomas/MetodoPagoTL.jsx', new: 'components/dueño_mascota/MetodoPagoTL.jsx' },
  { old: 'components/Tomas/NuevoDomiciloTL.jsx', new: 'components/dueño_mascota/NuevoDomiciloTL.jsx' },
  { old: 'components/Tomas/PedidoListoTL.jsx', new: 'components/dueño_mascota/PedidoListoTL.jsx' },
  { old: 'components/Tomas/ResumenCarritoTL.jsx', new: 'components/dueño_mascota/ResumenCarritoTL.jsx' },
  { old: 'components/Tomas/TituloCarritoTL.jsx', new: 'components/dueño_mascota/TituloCarritoTL.jsx' },
  { old: 'components/Tomas/VaciarCarritoTL.jsx', new: 'components/dueño_mascota/VaciarCarritoTL.jsx' },
  { old: 'components/Tomas/UsersRegisterTL.jsx', new: 'components/common/UsersRegisterTL.jsx' },
  { old: 'components/Tomas/VetRegisterTL.jsx', new: 'components/common/VetRegisterTL.jsx' },
  { old: 'components/Tomas/VetsAddTl.jsx', new: 'components/common/VetsAddTl.jsx' },

  // Xiomara
  { old: 'components/Xiomara/CardsXh.jsx', new: 'components/dueño_mascota/CardsXh.jsx' },
  { old: 'components/Xiomara/CarritoXh.jsx', new: 'components/dueño_mascota/CarritoXh.jsx' },
  { old: 'components/Xiomara/CloseSession.jsx', new: 'components/dueño_mascota/CloseSession.jsx' },
  { old: 'components/Xiomara/Configuracion_Xh.jsx', new: 'components/dueño_mascota/Configuracion_Xh.jsx' },
  { old: 'components/Xiomara/DireccionXh.jsx', new: 'components/dueño_mascota/DireccionXh.jsx' },
  { old: 'components/Xiomara/FormEntXh.jsx', new: 'components/dueño_mascota/FormEntXh.jsx' },
  { old: 'components/Xiomara/HistorialPe_Xh.jsx', new: 'components/dueño_mascota/HistorialPe_Xh.jsx' },
  { old: 'components/Xiomara/InfoU_Xh.jsx', new: 'components/dueño_mascota/InfoU_Xh.jsx' },
  { old: 'components/Xiomara/MascotasXh.jsx', new: 'components/dueño_mascota/MascotasXh.jsx' },
  { old: 'components/Xiomara/PaymentMethod_Xh.jsx', new: 'components/dueño_mascota/PaymentMethod_Xh.jsx' },
  { old: 'components/Xiomara/PerfilU_Xh.jsx', new: 'components/dueño_mascota/PerfilU_Xh.jsx' },
  { old: 'components/Xiomara/CambioContraseña/ChangePassXh.jsx', new: 'components/dueño_mascota/ChangePassXh.jsx' },
  { old: 'components/Xiomara/Metododepago/AddCard_Xh.jsx', new: 'components/dueño_mascota/AddCard_Xh.jsx' }
];

console.log('Moving files...');
for (const move of fileMoves) {
  const from = path.join(srcDir, move.old);
  const to = path.join(srcDir, move.new);
  if (fs.existsSync(from)) {
    // Ensure dir exists
    const dirname = path.dirname(to);
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
    fs.renameSync(from, to);
    console.log(`Moved ${move.old} -> ${move.new}`);
  } else {
    console.log(`Missing ${move.old}`);
  }
}

// Ensure the old folders are removed if empty, but for now we just leave them.
// We can delete them if needed. (Ignored for safety)

// Now replace all imports across all JS/JSX files in src/
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
          arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    }
  })
  return arrayOfFiles
}

const allJsFiles = getAllFiles(srcDir);

const nameToAliasMap = {};

// Handle dynamic imports mapping as well
for (const move of fileMoves) {
  const basename = path.basename(move.new, '.jsx').replace('.js', '');
  const aliased = '@/' + move.new.replace(/\\/g, '/').replace('.jsx', '').replace('.js', '');
  nameToAliasMap[basename] = aliased;
}

// Special cases: map api, config, etc.
const apiDir = path.join(srcDir, 'api');
if (fs.existsSync(apiDir)) {
  fs.readdirSync(apiDir).forEach(f => {
    if (f.endsWith('.js') || f.endsWith('.jsx')) {
      const base = f.replace('.js', '').replace('.jsx', '');
      nameToAliasMap[base] = '@/api/' + base;
    }
  });
}

console.log('Rewriting imports...');
for (const file of allJsFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const importRegex = /(?:import|from)\s+['"]([^'"]+)['"]/g;
  
  content = content.replace(importRegex, (match, p1) => {
    if (p1.startsWith('.') || p1.startsWith('@/')) {
        const p1Base = path.basename(p1).replace('.jsx', '').replace('.js', '');
        
        // If the basename matches an exact moved or known file, remap
        if (nameToAliasMap[p1Base]) {
            changed = true;
            return match.replace(p1, nameToAliasMap[p1Base]);
        }
        
        // Rewrite asset imports (styles, images, utilities)
        if ((Math.abs(p1.indexOf('styles/')) !== -1 || p1.indexOf('images/') !== -1 || p1.indexOf('utilities/') !== -1) && p1.startsWith('.')) {
            const resolved = path.resolve(path.dirname(file), p1);
            const relativeToSrc = path.relative(srcDir, resolved).replace(/\\/g, '/');
            changed = true;
            return match.replace(p1, '@/' + relativeToSrc);
        }
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in ${file}`);
  }
}
console.log('Refactor complete.');
