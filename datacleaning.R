
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
fishtown <- rco %>% filter(OBJECTID==35)%>%
  st_transform(crs = 2272)



### parcels

parcels <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/gsiplans.shp") %>%
  st_transform(crs = 2272)

ft_parcels <- parcels[fishtown,]


#ownertab <- table(ft_parcels$OWNER1) %>% as.data.frame()
#lottab <- table(ft_parcels$BC_TYPE) %>% as.data.frame()


#ft_vacant <- ft_parcels %>% filter(BC_TYPE == 'Vacant')

###


buildings <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/LI_BUILDING_FOOTPRINTS_1.shp")
buildings <- buildings %>% st_transform(crs = 2272)

ft_builds <- buildings[fishtown,]


#buildparcels <- table(ft_builds$PARCEL_ID_) %>% data.frame() 

#ft_builds <- left_join(ft_builds, buildparcels, by = c("PARCEL_ID_" = 'Var1'))

ft_build_parc <- ft_builds %>%  group_by(PARCEL_ID_) %>% 
  summarise(height = max(MAX_HGT), do_union = TRUE)  %>% st_centroid()

ft_parcels <- st_join(ft_parcels, ft_build_parc) 

ggplot(ft_parcels)+
  geom_histogram(aes(x = height))+
  scale_x_continuous(breaks = seq(0,150,10))


# ggplot()+
#   geom_sf(data = ft_parcels1,aes(fill= height),color=NA)
# 
# 
# 
# ggplot()+
#   geom_sf(data = ft_parcels, color= NA, fill = 'blue')+
#   geom_sf(data = ft_build_parc, color= NA, fill = 'red')




##L&I
permits <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/buildings/permits.shp")%>% st_transform(crs = 2272)
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
demos <- read_sf('https://phl.carto.com/api/v2/sql?q=SELECT+*+FROM+demolitions&filename=demolitions&format=geojson&skipfields=cartodb_id')%>% st_transform(crs = 2272)

ft_demos <- demos[fishtown,] %>% filter(typeofwork == 'FULL') %>%
  mutate(demostart = ymd_hms(start_date) %>% as_date(),
         demoend = ymd_hms(completed_date) %>%  as_date(),
         demolength = demoend-demostart)





####contractor stuffs
#democontractors <-table(factor(ft_demos$contractorname)) %>% as.data.frame()
#buildcontractors <-table(factor(ft_bperms$contractor)) %>% as.data.frame()






## Zoning
zoning  <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/zoningbd.shp")%>% st_transform(crs = 2272)

ft_zoning <- zoning[fishtown,]

# ggplot(ft_zoning)+
#   geom_sf(color=NA, aes(fill = LONG_CODE))+
#   geom_sf(data = ft_parcels, fill = NA)

ft_parcels <- st_join(ft_parcels,  ft_zoning)


## Land Use
# landuse <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/Land_Use.shp")%>% st_transform(crs = 2272)
# 
# ft_lu <- landuse[fishtown,]
# 
# otherfields <- ft_lu %>% filter(C_DIG2 %in% c(72, 62))
# 
# vacant <- ft_lu %>% filter(C_DIG2 == 91)
# 
# 
# ft_parcels$vacant <- st_intersects(ft_parcels,  vacant, sparse = F)[,1]


# #parks
# parks <- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/parks.shp") %>% st_transform(crs = 4326)
# 
# ft_parks <- parks[fishtown,] %>% st_join(otherfields)
# 
# ft_parcels$park <- st_intersects(ft_parcels,  ft_parks, sparse = F)[,1]
# 
# 
# ggplot()+
#   geom_sf(data = ft_parcels, aes(fill = park), color = NA)
#   
# 
# ### schools
# schools<- read_sf("C:/Users/cchue/Documents/GIS/PhillyData/Schools.shp")
# 
# ft_schools <- schools[fishtown,]
# 
# ft_parcels$school <- st_touches(ft_parcels,  ft_schools, sparse = F)[,1]
# 
# ggplot()+
#   geom_sf(data = ft_parcels, aes(fill = school), color =NA)+
#   geom_sf(data = ft_schools)
# 
# #businesses 

library(osmdata)

querybar <- opq ("philadelphia") %>%
  add_osm_feature(key = "amenity")  %>%
  osmdata_sf() 

bars <- querybar$osm_points %>% st_transform(crs = 2272)

bars <- bars[fishtown,] %>% select(name, amenity, geometry) %>% mutate(
  name = ifelse(!is.na(name), name, NA)) %>% select(name, amenity, geometry)




# %>% filter(!is.na(name))
queryshop <- opq ("philadelphia") %>%
  add_osm_feature(key = "shop")  %>%
  osmdata_sf() 

shops <- queryshop$osm_points %>% st_transform(crs = 2272)

shops<-shops[fishtown,]  %>% mutate(
  amenity = ifelse(!is.na(name),"SHOP", NA)) %>% select(name, amenity, geometry)



commercial <- rbind(bars,shops)





ft_parcels1 <- st_join(ft_parcels, commercial) %>% unique()

#export data

##Parcels +  zoning + buildingheight

ft_parcels_out <- ft_parcels1 %>% 
  select(ADDRESS, OWNER1, BC_TYPE, BC_LANDUSE, OWNER_CATE, LONG_CODE, PENDING, name, amenity, height, geometry) %>% 
  st_transform(crs = 4326) %>% mutate(
    OWNER1 = str_to_title(OWNER1),
    ADDRESS = str_to_title(ADDRESS)
    
  )



geojson_write(ft_parcels_out, geometry = "MULTIPOLYGON", file = "C:/Users/cchue/Documents/Penn MUSA/Javascript Programming/final-project/site/data/parcels.geojson")

ggplot(ft_parcels_out)+
  geom_sf(aes(fill = amenity),color = NA)

