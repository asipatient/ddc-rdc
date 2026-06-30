export function AdminNotice({ created, saved, deleted, error }: { created?: string; saved?: string; deleted?: string; error?: string }) {
  const message = error
    ? "Une erreur est survenue. Vérifiez les informations puis réessayez."
    : created
      ? "Le contenu a été ajouté avec succès."
      : saved
        ? "Les modifications ont été sauvegardées."
        : deleted
          ? "Le contenu a été supprimé."
          : "";

  if (!message) {
    return null;
  }

  return (
    <div
      className={`mb-6 rounded-lg border p-4 text-sm font-bold ${
        error
          ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          : "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
      }`}
    >
      {message}
    </div>
  );
}
