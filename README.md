# practica7.1_253239

1. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?
Porque el HorariosService es una clase real que sigue existiendo cuando el programa ya esta corriendo asi que Nest la reconoce sola nada mqs viendo su tipo

2. Si mandas un claseId que no es número, ¿qué código de estado esperarías, y por qué este Controller no lo detecta?
Esperaria un 400 pq claseId deberia ser un numero y mande texto en su lugar entonces mi Controller no lo detecta porque mis DTO de horarios son interfaces
simples sin ningun decorador de validacion como los que use en miembros
