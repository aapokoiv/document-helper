CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"expected_size_bytes" bigint NOT NULL,
	"storage_key" text NOT NULL UNIQUE,
	"status" text DEFAULT 'pending_upload' NOT NULL,
	"upload_expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
