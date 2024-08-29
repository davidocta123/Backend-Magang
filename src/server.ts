import app from './app';
import promClient, { collectDefaultMetrics, Registry } from 'prom-client';
import { Request, Response } from 'express';


const PORT = process.env.PORT || 8080;

// Create a new registry
const register = new Registry();

// Add the default metrics to the registry
collectDefaultMetrics({ register });

// Create a histogram metric
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000],
  registers: [register]
});

// Middleware to measure request duration
app.use((req: Request, res: Response, next) => {
  const start = process.hrtime();
  
  res.on('finish', () => {
    const duration = process.hrtime(start);
    const durationMs = duration[0] * 1000 + duration[1] / 1e6;
    httpRequestDurationMicroseconds
      .labels(req.method, req.path, res.statusCode.toString())
      .observe(durationMs);
  });

  next();
});

// Metrics endpoint
app.get('/metrics', async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Sample route
app.get('/tweets', (req: Request, res: Response) => {
  res.send('Hello World');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});