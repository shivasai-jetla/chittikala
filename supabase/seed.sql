-- Optional: import the existing sample catalogue once.
insert into public.products (id,name,category,price,old_price,badge,description,image) values
(1,'Gulabi Bloom Saree','Sarees',1899,2399,'Bestseller','Soft floral drape with a graceful festive finish.','https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85'),
(2,'Malli Cotton Kurti','Kurtis',899,1199,'New','Breathable cotton with delicate everyday detailing.','https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=85'),
(3,'Temple Gold Jhumka Set','Jewellery',649,null,'Handpicked','Statement jhumkas made for sarees, kurtis and celebrations.','https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85'),
(4,'Rani Evening Dress','Dresses',1499,1799,'Limited','A feminine silhouette with a rich jewel-toned mood.','https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85'),
(5,'Kumkum Printed Saree','Sarees',2199,null,'Festive edit','Elegant print, luminous border and an easy festive drape.','https://images.unsplash.com/photo-1610189012906-9f54c5f2e5f3?auto=format&fit=crop&w=900&q=85'),
(6,'Mogra Pearl Hair Clip','Accessories',349,null,'Under ₹500','Pearl detailing for a polished finishing touch.','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85'),
(7,'Mehendi Green Co-ord','Dresses',1299,1599,null,'Relaxed tailoring with a sophisticated festive palette.','https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85'),
(8,'Lakshmi Layered Necklace','Jewellery',1199,null,'Statement','Layered elegance designed to become the centrepiece.','https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=85'),
(9,'Kanchipuram Rose Silk Saree','Sarees',3299,3899,'Festive','Rich silk-inspired drape with a classic contrast border.','https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85'),
(10,'Ananya Embroidered Kurti','Kurtis',1099,1399,'Bestseller','Soft rayon kurti with delicate floral embroidery.','https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85'),
(11,'Madhubani Anarkali','Dresses',1799,null,'New','Flowy Anarkali silhouette with an artistic print.','https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85'),
(12,'Lakshmi Temple Jhumkas','Jewellery',799,null,'Popular','Traditional gold-tone jhumkas for festive dressing.','https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85'),
(13,'Meena Stone Bangles Set','Accessories',499,null,'Under ₹500','A colourful bangle stack to finish your ethnic look.','https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85'),
(14,'Marigold Chikankari Kurti','Kurtis',1299,1599,null,'Airy everyday chikankari-inspired detailing in a warm hue.','https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85'),
(15,'Saanvi Party Gown','Dresses',1999,null,'Occasion edit','Elegant occasionwear with a flattering flowing finish.','https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85'),
(16,'Pearl Potli Bag','Accessories',699,null,'New','Pearl-detailed potli bag for weddings and festive evenings.','https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85');
select setval(pg_get_serial_sequence('public.products','id'), (select max(id) from public.products));
