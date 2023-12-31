# Web-разработка

## Лабораторная работа 1

### Задание

#### Пункт 1

Взять за основу большое приложение с базой данных (например, ЛР по ППО, курсовой проект по БД, личный проект и т.д.). Рекомендуется брать уже существующий проект, чтобы не тратить время на разработку бизнес-логики и логики взаимодействия с БД. 
Можно взять любую новую идею, которая предполагает работу с 3-5 сущностями в базе данных (или ином хранилище, в т.ч. удаленном), и 2-3 формы взаимодействия с пользователем.
Если идея больше, то допускается формирование групп в 2 человека (с кратным увеличением сложности и объема задачи).
С этим приложением будут связаны еще 2 работы: макетирование и реализация SPA.
Если на курсовой у вас было десктопное приложение - так даже интереснее - особенно если удастся сохранить поддержку старого UI.

#### Пункт 2

В .md файле подготовить, кратко:

1. Цель работы, решаемая проблема/предоставляемая возможность.
2. Краткий перечень функциональных требований.
3. Use-case диаграмма системы.
4. Экраны будущего приложения на уровне черновых эскизов. Задача данного упражнения - понять, как с приложением должен взаимодействовать пользовать для упрощения проектирования API. Это могут быть классические wireframes, черновики от руки, наброски в PAINT/псевдографике/Figma. 
   
   **Примечание**: здесь не требуется UI UX дизайн, требуется примерное распределение функциональности по экранам и возможным компонентам управления.
5. ER-диаграмма сущностей системы.

#### Пункт 3

Спроектировать в формате Swagger (https://editor.swagger.io/) внешнее публичное API системы в идеологии REST, дающее доступ ко всем данным и функциям системы, необходимое для внешних интеграций и последующего подключения клиентского SPA-приложения.

Если система предполагает двунаправленное или реал-тайм взаимодействие допускается вынести часть API из REST (и реализовать его на базе web sockets/grpc/soap). Вынесенное api документировать в отдельном .md файле.

Предусмотреть как минимум один вызов на базе метода PATCH.

**Примечание 1**: сделать сразу по REST, чтобы потом не переделывать много раз. Не как вам кажется должно выглядеть REST API, а так, как оно действительно должно выглядеть (можно посмотреть тут - https://restfulapi.net/ )

**Примечание 2**: Во время проектирования API внимательно изучить методы HTTP и коды ответов, а также основные заголовки. Эта информация пригодится при сдаче лабораторных.

#### Пункт 4

По спроектированному swagger подготовить реализацию в программном коде. К реализации так же подключить swagger, уже для документирования (возможны вариации в зависимости от используемой технологии). Придерживаться подходов “чистой архитектуры”: поддерживать абстрагирование СУБД путем использования паттерна Repository, использовать три модели сущности: сущность БД, сущность системы и DTO для API. Если в проекте уже есть UI, то поддерживать его в рабочем состоянии. Если уже есть api, то оставить его в версии api/v1 и создать новое api/v2.

**Примечание**: к приложению предъявляются все те же требования, что предъявлялись к приложениям в рамках курса ППО.

#### Пункт 5

Настроить Nginx для работы web-приложения в части маршрутизации (Гайд для начинающих):
1. Настроить маршрутизацию /api/v1 (/api/v2) на подготовленное REST API
2. По пути /api/v1 (/api/v2) отдавать swagger
3. Если у системы был старый MPA или SPA интерфейс - проксировать его на /legacy. Если MPA-интерфейса не было, то сделать страничку с ссылкой на загрузку десктопной/консольной версии. 
4. Настроить / на отдачу статики (в будущем - SPA-приложения). Пока положить приветственный HTML (/static/index.html) с картинкой (static/img/image.jpg).
5. Настроить /test на отдачу той же страницы, что и /
6. Настроить /admin на проксирование в админку базы данных (любую стандартную).
7. Настроить /status на отдачу страницы статуса сервера Nginx (nginx status)

#### Пункт 6


Настроить Nginx в части балансировки (Гайд по настройке балансировки): запустить еще 2 инстанса бэкенда на других портах с правами доступа в базу данных только на чтение и настроить балансировку GET запросов к /api/v1 (/api/v2) в NGINX на 3 бэкенда в соотношении 2:1:1, где первый - основной бэкенд-сервер. 

Провести нагрузочное тестирование с помощью ApacheBenchmark, результаты оформить в виде отчета в .md.
Быть готовым показать и доказать, что балансировка действительно работает.

#### Пункт 7

Настроить Nginx в части маршрутизации, таким образом, чтобы url /mirror вел на отдельно развернутую версию приложения, и при этом, все относительные урлы приложения корректно работали с новым префиксом  (/mirror/api/v1 и др.).

#### Пункт 8

Настроить Nginx таким образом, чтобы подменялось имя сервера в заголовках http-ответов (проставлялось название приложения). 

#### Пункт 9

Настроить кеширование (для всех GET-запросов, кроме /api) и gzip-сжатие в Nginx (Настройка gzip сжатия, Гайд по настройке кеширования). 

