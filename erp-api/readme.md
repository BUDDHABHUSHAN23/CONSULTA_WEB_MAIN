erp-api/
├─ .env                      # local env (plus .env.development, .env.production)
├─ package.json
├─ README.md
├─ docker-compose.yml        # optional
├─ tsconfig.json             # if TypeScript
├─ src/
│  ├─ app.js                 # creates express app, attaches middleware & routes
│  ├─ server.js              # boots HTTP server, health checks, signals
│  ├─ config/                # config loaders (env, logger, swagger, cors)
│  ├─ loaders/               # one-time bootstraps (express, mongoose/pg, redis)
│  ├─ routes/                # mounts module routes (index.js only)
│  ├─ middlewares/           # auth, errorHandler, rateLimiter, multer, cors
│  ├─ utils/                 # helpers (crypto, date, response wrapper)
│  ├─ validations/           # joi/zod schemas shared across modules
│  ├─ repositories/          # DB access abstraction (optional with Mongoose)
│  ├─ services/              # cross-module services (mail, sms, storage, queue)
│  ├─ jobs/                  # bull/agenda/cron tasks
│  ├─ sockets/               # socket.io setup (if needed)
│  ├─ events/                # domain events / emitters (optional)
│  ├─ modules/               # 💡 feature-first folders live here
│  │  ├─ auth/
│  │  │  ├─ auth.controller.js
│  │  │  ├─ auth.service.js
│  │  │  ├─ auth.routes.js
│  │  │  ├─ auth.validation.js
│  │  │  └─ index.js         # exports router
│  │  ├─ users/
│  │  ├─ expenses/
│  │  ├─ approvals/
│  │  └─ files/
│  └─ types/                 # (TS) global types & dto interfaces
├─ storage/
│  └─ uploads/               # local uploads (switchable to S3 later)
├─ scripts/                  # db seeders, one-off maintenance
└─ tests/                    # jest/supertest
