BEGIN;
DROP TABLE IF EXISTS "token";

CREATE TABLE "token" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "token" VARCHAR(500) NOT NULL,
    "words_justified" INT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);


COMMIT;