export async function actualizarPerfil(perfil) {
  const result = await fetch('http://localhost:8080/ChangePassword', {

    method: "PACz<TH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(perfil),
  });

  if (!result.ok) throw new Error("Error al actualizar perfil");
  return result.json();
}


export async function cambiarContrasena({ actual, nueva }) {
  const result = await fetch(`http://localhost:8080/ChangePassword`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contrasenaActual: actual, nuevaContrasena: nueva }),
  });

  if (!result.ok) throw new Error("Error al cambiar contraseña");
  return result.json();
}