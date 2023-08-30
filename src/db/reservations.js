async function isReservationValid(invitationValue) {
    console.log('supabase client', supabase);
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('value', invitationValue)
            .eq('used_by_wallet', "0x")
            .limit(1);
        
        if (error) throw error;
        console.log('supabase data response: ', data);
        return data && data.length > 0;
    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return false;
    }
}
export {isReservationValid}