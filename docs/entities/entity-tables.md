---
sidebar_position: 4
---

# Entity Tables

[[API Docs](/api/entity/#tag/Entities)]
[[SDK](https://www.npmjs.com/package/@epilot/entity-client)]

The Entity tables offer a variety of features ranging from performing search and filtering on the table attributes, sortin the attributes, saving views out of the your most used configurations, importing/exporting bulk data etc.

## Search and Filtering

[Search API](/api/entity/#tag/Entities/operation/searchEntities)


### Supported Types of search and filtering

#### 1. Simple input search

Example:
Enter any keyword which does a fuzzy search across the entities of the curent schema
`abc` => searched through the entity and its relations data - since the relations are stored hydrated.

Note: This doesn't search for information in nested relations i.e. the relation of the relations of entities (One customer attempted to do this in the past)

#### 2. Filter based search
This allows to search through the available attributes of an entity, withy the attributes being loaded from the latest entity schema. For each type of attribute, we handle the way it should be rendered. There are a varierty of types of attributes in our system. Lets go through those:

##### General:

- <b>Empty (New ✨)</b> attribute - Easily find an entity by clicking on empty (leer) to find an entity with selected attribute as empty, for e.g search all opportunities with no tags, no product, no portal user, no creation date, etc.
###### Usage examples:
    - Click on Title -> (empty) - returns all entities with no title.
    - Click on Product -> (empty) - returns all entities with no products related to them
    - Click on Customer -> Last name -> (empty) - returns all entities with customers with no last name defined.

<figure>
<img width="1152" alt="Screenshot 2024-03-21 at 00 40 58" src="https://github.com/epilot-dev/docs/assets/26349046/0689baa5-4464-4083-8b9c-e3972213305f" /></figure>
<figure>
<img width="1200" alt="Screenshot 2024-03-21 at 00 41 09" src="https://github.com/epilot-dev/docs/assets/26349046/c49e4ee8-b7cc-4d08-83a2-0f9db2496435" />
<figcaption style={{textAlign: 'center'}}><em>Empty filter Usage</em></figcaption>
</figure>

- <b>Tags</b> -> use this to find entity by its associated tag
- <b>Purposes</b>  -> use this to find entity by its associated tag

- <b>ID</b>  -> quick and handy way to search an entity directly by its ID


##### Entity specific:
a) <b>String</b> type attributes like title, tag, etc -> rendered simply as list of items when the string attribute is selected

b) <b>Number</b> type attributes like capacity, value etc. -> rendered as a combination of number range filter (default) and if deselected, simply as list of numbers

c) Object type like <b>address</b> - comprise of below supported fields: 

    - Street
    - Street number
    - Suburb
    - Plot of land  
    - Plot Area
    - Postal Code
    - City
    - Country
    - Company name
    - Additional Info
    - Title
    - Salutation
    - First Name
    - Last name
    - Tags

d) <b>Relation</b> type attributes like for opportunity entity table => Product, Customer -> rendered as the attributes of the selected schema, which goes one level further, to show the list of values for tthe relation attributes. Note: only non-relation attributes are loaded of the relation schema.

e) <b>Date</b> type attributes -> Rendered as Calendar with defined ranges such as empty date, today, yesterday, this month etc.

f) <b>Select</b> type attributes -> Renders the options defined in a select attribute configuration like yes, no, type of files, etc

g) <b>User</b> type attributes -> Renders the list of user name with their email and user avatar to see for e.g. all entities assigned to this user

<b>Unsupported attributes:</b>
- Computed type = e.g. price etc.
- Image
- File

<!-- Loading filter suggestions -->
When you click on an attribute to filter for its values, you will see data loaded in chunks of `[1, 3, 10, 50]`.

By default, only the first 50 results are loaded for the selected attribute, however, if you need to look for more:

- Type in the unique key to find the filter value you are looking for
- This will fetch the first 50 results with the keyword you searched for


## Saved Views

- [Creating, favoriting, deleting views](/api/entity#tag/Saved-Views)

Would like an elaborate explanation to use Saved views? We got you!

<i>Coming soon...</i>


## Import Export entities

- [Export Entities](/api/entity/#tag/Export/operation/exportEntities)


- [Import Entities](/api/entity#tag/Entity-Import/operation/importEntities)

Would like an elaborate explanation to use Import/Export on entities? We got you!

<i>Coming soon...</i>