import app from './app';
import promClient from 'prom-client';
import { Request, Response } from 'express';



const PORT = process.env.PORT || 9000;

const register = new promClient.Registry();
register.setDefaultLabels({
  app: 'be-bootcamp-kg',
});

app.get('/metrics', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

const httpRequestTimer = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  // buckets for response time from 0.1ms to 1s
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000],
});

app.get('/tweets', async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    
  } finally {
    const responseTimeInMs = Date.now() - start;
    httpRequestTimer.labels(req.method, req.route.path, res.statusCode.toString()).observe(responseTimeInMs);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
});

