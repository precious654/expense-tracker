create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
	insert into public.user_profiles (id, name, account_type, team_role)
	values (
		new.id,
		new.raw_user_meta_data ->> 'display_name',
		new.raw_user_meta_data ->> 'account_type',
		new.raw_user_meta_data ->> 'team_role'
	);
	return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();