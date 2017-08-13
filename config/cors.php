<?php

return [
    /*
     |--------------------------------------------------------------------------
     | Laravel CORS
     |--------------------------------------------------------------------------
     |
     | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
     | to accept any value.
     |
     */
    'supportsCredentials' => true,
    'allowedOrigins' => ['*'],
    'allowedHeaders' => ['Origin', 'Content-Type', 'X-Auth-Token', 'Authorization', 'Accept', 'User-Agent'],
    'allowedMethods' => ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    'exposedHeaders' => [],
    'maxAge' => 0,
];

