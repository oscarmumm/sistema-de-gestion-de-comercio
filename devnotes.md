DB CREATION:

DESKTOP
\i 'C:/Users/oscar/workspace/sistema-de-gestion-de-comercio/backend/database/schema.sql'

LAPTOP
\i 'C:/workspace/sistema-de-gestion-de-comercio/backend/database/schema.sql'

CREAR UN REMITO CUANDO SE INGRESA MERCADERÍA. 
DEBE SER GENERADO LUEGO DE QUE SE INSERTA EN LA BASE DE DATOS.
ABRIRLO EN UNA PESTAÑA NUEVA
PERMITIR DESCARGAR E IMPRIMIR
Para comenzar con esta funcionalidad es necesario crear una query desde el modelo de stock_entries, que traiga la información de dicho ingreso de mercadería inmediatemente después de que se confirma su correcta insersión, de este modo utilizamos esa info para generar el remito. MODEL -> CONTROLLER -> ROUTE -> API -> StockEntry Component