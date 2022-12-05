### Javascript Final data cleaning

##fishtown boundries
##building outlines
#https://studio.mapbox.com/datasets/chuembucket/clb45ll9m0qxn20ny9es778nt/edit/

library(tidyverse)
library(sf)
library(geojsonio)
library(lubridate)


sf::sf_use_s2(FALSE)


buildings <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/LI_BUILDING_FOOTPRINTS_1.shp")

rco <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/Zoning_RCO.shp")
fishtown <- rco %>% filter(OBJECTID==35)

fishtownbuilds <- buildings[fishtown,]



ggplot(fishtownbuilds)+
  geom_sf(color= NA,aes(fill=MAX_HGT))


##L&I
permits <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/buildings/permits.shp")
#appeals <- readOGR("C:/Users/Charlie/Documents/GIS/PhillyData/buildings", layer = "appeals", verbose = T) %>% st_as_sf()

ft_perms <- permits[fishtown,]


ft_bperms <- ft_perms %>% filter(permittype == 'BUILDING') %>%
  mutate(perm_issued = ymd(permitissu),
         date2 = ymd(mostrecent),
         issue_date2 = date2-perm_issued)

ggplot(ft_bperms)+
  geom_bar(aes(x=perm_issued, y = issue_date2), stat= 'identity')

ggplot(ft_bperms)+
  geom_sf(aes(color = perm_issued))

#boundsfishtown <- c(ymax = 39.99, ymin = 39.964, xmin =-75.1525, xmax = -75.1125)

## demo data
demos <- read_sf('https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+demolitions&filename=demolitions&format=geojson&skipfields=cartodb_id')

ft_demos <- demos[fishtown,] %>% filter(typeofwork == 'FULL') %>%
  mutate(demostart = ymd_hms(start_date) %>% as_date(),
         demoend = ymd_hms(completed_date) %>%  as_date(),
         demolength = demoend-demostart)


ggplot(ft_demos)+
  geom_bar(aes(x=demostart, y = demolength), stat= 'identity')



###contractor stuffs
democontractors <-table(factor(ft_demos$contractorname)) %>% as.data.frame()
buildcontractors <-table(factor(ft_bperms$contractor)) %>% as.data.frame()


builddemo <- st_join(fishtownbuilds, ft_demos)

ggplot(builddemo)+
  geom_sf(aes(fill = typeofwork),color =NA)


### parcels

parcels <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/gsiplans.shp")

ft_parcels <- parcels[fishtown,]

ggplot(ft_parcels)+
  geom_sf()

ownertab <- table(ft_parcels$OWNER1) %>% as.data.frame()
lottab <- table(ft_parcels$BC_TYPE) %>% as.data.frame()


ft_vacant <- ft_parcels %>% filter(BC_TYPE == 'Vacant')
levels(factor(ft_vacant$OWNER_CATE))

 
ft_parcels_out <- ft_parcels %>% 
  select(ADDRESS, OWNER1, BC_TYPE, OWNER_CATE, geometry)


geojson_write(ft_parcels_out, geometry = "MULTIPOLYGON", file = "C:/Users/cchue/Documents/Penn MUSA/Javascript Programming/final-project/parcels.geojson")
