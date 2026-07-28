import { randomUUID } from "crypto";
import pool from "../../config/db.js";
import supabase from "../../config/supabase.js";

const BUCKET = "grievance-files";

// Upload Attachment
export const uploadAttachmentService = async (grievanceId, file, userId) => {
  // Check grievance
  const grievance = await pool.query(
    `
        SELECT id
        FROM grievances
        WHERE id = $1
        `,
    [grievanceId],
  );

  if (grievance.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  const extension = file.originalname.split(".").pop();

  const uniqueName = `${randomUUID()}.${extension}`;

  const filePath = `${grievanceId}/${uniqueName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const result = await pool.query(
    `
        INSERT INTO grievance_attachments
        (
            grievance_id,
            file_name,
            file_path,
            file_type,
            file_size,
            uploaded_by
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
    [
      grievanceId,
      file.originalname,
      filePath,
      file.mimetype,
      file.size,
      userId,
    ],
  );

  return result.rows[0];
};

// Get Attachments
export const getAttachmentsService = async (grievanceId) => {
  const result = await pool.query(
    `
        SELECT *
        FROM grievance_attachments
        WHERE grievance_id = $1
        ORDER BY uploaded_at DESC
        `,
    [grievanceId],
  );

  return result.rows;
};

// Delete Attachment
// Delete Attachment
export const deleteAttachmentService = async (id) => {
  const attachment = await pool.query(
    `
        SELECT *
        FROM grievance_attachments
        WHERE id = $1
        `,
    [id],
  );

  if (attachment.rows.length === 0) {
    throw new Error("Attachment not found.");
  }

  const file = attachment.rows[0];

  // Delete from Supabase Storage
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([file.file_path]);

  if (error) {
    throw new Error(error.message);
  }

  // Delete from Database
  await pool.query(
    `
        DELETE
        FROM grievance_attachments
        WHERE id = $1
        `,
    [id],
  );

  // Return deleted attachment details
  return file;
};
// Generate Signed URL
export const getAttachmentUrlService = async (id) => {
  const result = await pool.query(
    `
        SELECT *
        FROM grievance_attachments
        WHERE id = $1
        `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error("Attachment not found.");
  }

  const attachment = result.rows[0];

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(attachment.file_path, 60 * 10);

  if (error) {
    throw new Error(error.message);
  }

  return {
    attachment,
    url: data.signedUrl,
  };
};
