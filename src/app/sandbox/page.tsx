import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/utils";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div>
      Seed function
      <form
        action={async () => {
          "use server";

          await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );

          await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              parent: index !== 0 ? 1 : index,
              size: Number(file.size),
              url: file.url,
            })),
          );
        }}
      >
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
