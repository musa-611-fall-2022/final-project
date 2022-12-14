### Javascript Final data cleaning

##fishtown boundries
##building outlines
#https://studio.mapbox.com/datasets/chuembucket/clb45ll9m0qxn20ny9es778nt/edit/

library(tidyverse)
library(sf)
library(geojsonio)
library(lubridate)


sf::sf_use_s2(FALSE)



rco <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/Zoning_RCO.shp")
fishtown <- rco %>% filter(OBJECTID==35)


### parcels

parcels <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/gsiplans.shp") %>%
  st_transform(crs = 2272)

ft_parcels <- parcels[fishtown,]

ggplot(ft_parcels)+
  geom_sf()

ownertab <- table(ft_parcels$OWNER1) %>% as.data.frame()
lottab <- table(ft_parcels$BC_TYPE) %>% as.data.frame()


ft_vacant <- ft_parcels %>% filter(BC_TYPE == 'Vacant')
levels(factor(ft_vacant$OWNER_CATE))

###


buildings <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/LI_BUILDING_FOOTPRINTS_1.shp")
buildings <- buildings %>% st_transfrom(crs = 2272)

ft_builds <- buildings[fishtown,]


#buildparcels <- table(ft_builds$PARCEL_ID_) %>% data.frame() 

#ft_builds <- left_join(ft_builds, buildparcels, by = c("PARCEL_ID_" = 'Var1'))

ft_build_parc <- ft_builds %>%  group_by(PARCEL_ID_) %>% 
  summarise(height = max(MAX_HGT), do_union = TRUE)  %>% st_centroid()

ft_parcels <- st_join(ft_parcels, ft_build_parc) 


# ggplot()+
#   geom_sf(data = ft_parcels1,aes(fill= height),color=NA)
# 
# 
# 
# ggplot()+
#   geom_sf(data = ft_parcels, color= NA, fill = 'blue')+
#   geom_sf(data = ft_build_parc, color= NA, fill = 'red')




##L&I
permits <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/buildings/permits.shp")
#appeals <- readOGR("C:/Users/Charlie/Documents/GIS/PhillyData/buildings", layer = "appeals", verbose = T) %>% st_as_sf()

ft_perms <- permits[fishtown,]


ft_bperms <- ft_perms %>% filter(permittype == 'BUILDING') %>%
  mutate(perm_issued = ymd(permitissu),
         date2 = ymd(mostrecent),
         issue_date2 = date2-perm_issued)

#ggplot(ft_bperms)+
  #geom_bar(aes(x=perm_issued, y = issue_date2), stat= 'identity')

#ggplot(ft_bperms)+
 # geom_sf(aes(color = perm_issued))

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



## Zoning
zoning  <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/zoningbd.shp")

ft_zoning <- zoning[fishtown,]

ggplot(ft_zoning)+
  geom_sf(color=NA, aes(fill = LONG_CODE))+
  geom_sf(data = ft_parcels, fill = NA)

ft_parcels <- st_join(ft_parcels,  ft_zoning)


## Land Use
landuse <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/Land_Use.shp")

ft_lu <- landuse[fishtown,]

otherfields <- ft_lu %>% filter(C_DIG2 %in% c(72, 62))

vacant <- ft_lu %>% filter(C_DIG2 == 91)

ggplot(vacant)+
  geom_sf()

ft_parcels$vacant <- st_intersects(ft_parcels,  vacant, sparse = F)[,1]


#parks
parks <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/parks.shp") %>% st_transform(crs = 4326)

ft_parks <- parks[fishtown,] %>% st_join(otherfields)

ft_parcels$park <- st_intersects(ft_parcels,  ft_parks, sparse = F)[,1]


ggplot()+
  geom_sf(data = ft_parcels, aes(fill = park), color = NA)
  

### schools
schools<- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/Schools.shp")

ft_schools <- schools[fishtown,]

ft_parcels$school <- st_touches(ft_parcels,  ft_schools, sparse = F)[,1]

ggplot()+
  geom_sf(data = ft_parcels, aes(fill = school), color =NA)+
  geom_sf(data = ft_schools)



#export data

##Parcels +  zoning + buildingheight

ft_parcels_out <- ft_parcels %>% 
  select(ADDRESS, OWNER1, BC_TYPE, BC_LANDUSE, OWNER_CATE, LONG_CODE, PENDING, height, geometry)

geojson_write(ft_parcels_out, geometry = "MULTIPOLYGON", file = "C:/Users/cchue/Documents/Penn MUSA/Javascript Programming/final-project/site/data/parcels.geojson")



