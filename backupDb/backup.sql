PGDMP                         w         	   kanoahndo    11.2    11.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    16418 	   kanoahndo    DATABASE     �   CREATE DATABASE kanoahndo WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Portuguese_Brazil.1252' LC_CTYPE = 'Portuguese_Brazil.1252';
    DROP DATABASE kanoahndo;
             postgres    false            �            1259    16436    objetos    TABLE     Y   CREATE TABLE public.objetos (
    id integer NOT NULL,
    nome character varying(50)
);
    DROP TABLE public.objetos;
       public         postgres    false            �            1259    16439    objetos_id_seq    SEQUENCE     w   CREATE SEQUENCE public.objetos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.objetos_id_seq;
       public       postgres    false    196            �           0    0    objetos_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.objetos_id_seq OWNED BY public.objetos.id;
            public       postgres    false    197            �            1259    16441 	   operacoes    TABLE     {   CREATE TABLE public.operacoes (
    id integer NOT NULL,
    id_objeto integer NOT NULL,
    nome character varying(50)
);
    DROP TABLE public.operacoes;
       public         postgres    false            �            1259    16447    operacoes_id_seq    SEQUENCE     y   CREATE SEQUENCE public.operacoes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.operacoes_id_seq;
       public       postgres    false    198            �           0    0    operacoes_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.operacoes_id_seq OWNED BY public.operacoes.id;
            public       postgres    false    199            �           2604    16449 
   objetos id    DEFAULT     h   ALTER TABLE ONLY public.objetos ALTER COLUMN id SET DEFAULT nextval('public.objetos_id_seq'::regclass);
 9   ALTER TABLE public.objetos ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196            �           2604    16450    operacoes id    DEFAULT     l   ALTER TABLE ONLY public.operacoes ALTER COLUMN id SET DEFAULT nextval('public.operacoes_id_seq'::regclass);
 ;   ALTER TABLE public.operacoes ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198            ~          0    16436    objetos 
   TABLE DATA               +   COPY public.objetos (id, nome) FROM stdin;
    public       postgres    false    196   �       �          0    16441 	   operacoes 
   TABLE DATA               8   COPY public.operacoes (id, id_objeto, nome) FROM stdin;
    public       postgres    false    198   �       �           0    0    objetos_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.objetos_id_seq', 5, true);
            public       postgres    false    197            �           0    0    operacoes_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.operacoes_id_seq', 44, true);
            public       postgres    false    199                       2606    16452    objetos objetos_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.objetos
    ADD CONSTRAINT objetos_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.objetos DROP CONSTRAINT objetos_pkey;
       public         postgres    false    196                       2606    16454    operacoes operacoes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.operacoes
    ADD CONSTRAINT operacoes_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.operacoes DROP CONSTRAINT operacoes_pkey;
       public         postgres    false    198                       2606    16455 "   operacoes operacoes_id_objeto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.operacoes
    ADD CONSTRAINT operacoes_id_objeto_fkey FOREIGN KEY (id_objeto) REFERENCES public.objetos(id);
 L   ALTER TABLE ONLY public.operacoes DROP CONSTRAINT operacoes_id_objeto_fkey;
       public       postgres    false    198    2049    196            ~     x�m�MN�0��3�����v	!H�@�b�f�������y`Q���NZ��?���o4d^L�
�� �ʰJ�V�;�)�TQkgK%�`��8�D���������U��HJ&�kH�a��^py���ll=����MO�^�ろx�2��Gŭ�u7yO��ç�N����T��0s�f�B�R`�s���SǮ��^�M�_W�_}�VT=G��pKvG��
26֌��`�'�9�߃Zy���CԟͼF���/�}      �   �  x�u�Kn�0���S����Ë,ً)�$@V�f ��T�e��.��)t��−ku7?�r^d��{��;�G{]�#���ӹ�����DdJ���� �9�{e�n�������k	Kg�m�B�N7�{E[p�ot��n}�?;M_�Ξ���,����.��d~�ȱ���������q�s��Kol@n��ٶ�t�f	O�H��b�O�(�iq�b�PLX�"zr1����]�j
�|Ө��`�\����YO�Ն6�ƥ�%T�mB�[\2�n�s�s�to�/D�vLd��r�)EU������쇇��S[&����t���'̵�N�M�XI	7�Y�s���V0�4zд���)"9�vNVM7v���z)�g��W]�ۀM�q���x��{�k��cB� he*B     